import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { error } from 'console';

@Component({
  selector: 'app-bookinghistory',
  templateUrl: './bookinghistory.component.html',
  styleUrl: './bookinghistory.component.css'
})
export class BookinghistoryComponent implements OnInit{

  bookings:any[]=[];
  constructor(private bookingService:BookingService,
    private route:ActivatedRoute,
    private authService:AuthService){}

    ngOnInit(): void {
      const email=this.authService.getEmailFromToken();
      this.bookingService.getUserIdByEmail(email).subscribe({
      next:(userId:number)=>{
      this.bookingService.getBookingsForUser(userId).subscribe({
      next: (data) => {
        this.bookings = data;
      },
      error: (err) => {
        console.error('Failed to fetch bookings:', err);
      }
      });
      },
      error:(err)=>{
        console.error('Failed to fetch userId:',err);
      }
    });
    }
}
