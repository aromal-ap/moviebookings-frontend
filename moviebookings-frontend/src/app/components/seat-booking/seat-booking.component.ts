import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { BookingService } from '../../services/booking.service';
import { SeatService } from '../../services/seat.service';
import { ShowService } from '../../services/show.service';

@Component({
  selector: 'app-seat-booking',
  templateUrl: './seat-booking.component.html',
  styleUrl: './seat-booking.component.css'
})
export class SeatBookingComponent implements OnInit{

  totalAmount:number=0;
  showId!: number;
  seatPrice!: number;
  availableSeats: any[] = [];
  selectedSeats: any[] = [];

  movieTitle!: string;
  posterUrl!: string;
  screenName!: string;
  showTime!: string;

   constructor(
    private route: ActivatedRoute,
    private bookingService: BookingService,
    private seatService:SeatService,
    private authService: AuthService,
    private showService:ShowService,
    private router: Router
  ) {}

  ngOnInit(): void {
  this.showId = Number(this.route.snapshot.paramMap.get('showId'));

  this.showService.getShowById(this.showId).subscribe({
  next: (show) => {
    console.log('Show from backend:', show);
    this.movieTitle = show.movie.title;
    this.posterUrl = show.movie.posterUrl;
    this.screenName = show.screen.screen;
    this.seatPrice = show.seatPrice;
    this.showTime = show.showTime;
  },
  error: (err) => {
    console.error('Error fetching show:', err);
  }
});


  this.fetchAvailableSeats();
}


  // ngOnInit(): void {
  //   this.showId = Number(this.route.snapshot.paramMap.get('showId'));
  //   const state = history.state;
  //   this.movieTitle = state.movieTitle;
  //   this.posterUrl = state.posterUrl;
  //   this.screenName = state.screenName;
  //   this.seatPrice = state.seatPrice;
  //   this.showTime = state.showTime;

  //   this.fetchAvailableSeats();
  // }

  fetchAvailableSeats() {
    this.seatService.getAllSeatsForShow(this.showId).subscribe(seats => {
      this.availableSeats = seats;
    });
  }

  toggleSeat(seat: any) {
    if (seat.seatStatus !== 'AVAILABLE') return;

  const index = this.selectedSeats.findIndex(s => s.id === seat.id);
  if (index !== -1) {
    this.selectedSeats.splice(index, 1);
  } else {
    this.selectedSeats.push(seat);
  }
    this.calculateTotal();
  }


  confirmBooking() {

    const token = localStorage.getItem('token');
  if (!token) {
    alert('Please log in to confirm your booking.');
    this.router.navigate(['/login']);
    return;
  }

    const userEmail = this.authService.getEmailFromToken();
    this.bookingService.getUserIdByEmail(userEmail).subscribe(userId => {
      const seatIds = this.selectedSeats.map(seat => seat.id);
      this.bookingService.createBooking(userId, this.showId, seatIds).subscribe(
        (booking:any)=> {
          alert('Booking Successful!');
          //sending booking object via state navigation
          this.router.navigate(['/booking-details'],{state:{booking}});
        },
        err => alert('Booking failed: ' + err.error.message)
      );
    });
  }

  
  isSeatSelected(seat: any): boolean {
    return this.selectedSeats.some(s => s.id === seat.id);
  }

  get selectedSeatNames(): string {
    return this.selectedSeats.map(seat => seat.seatNumber).join(', ');
  }


  calculateTotal() {
    this.totalAmount = this.selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
  }
}
