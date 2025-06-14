import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookingService } from '../../services/booking.service';
import { blob } from 'node:stream/consumers';
import { error } from 'node:console';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-bookingdetails',
  templateUrl: './bookingdetails.component.html',
  styleUrl: './bookingdetails.component.css'
})
export class BookingdetailsComponent implements OnInit{

  
  constructor(private router:Router,
              private authService:AuthService,
              private bookingService:BookingService){};
  booking:any;

  ngOnInit(): void {
    this.booking=history.state.booking;
    console.log(this.booking);
    if(!this.booking){
       alert("No booking found!");
       setTimeout(() => this.router.navigate(['/']), 3000);
    }
  }

  get seatNumbers(): string {
  return this.booking?.bookedSeats.map((seat: { seatNumber: any; }) => seat.seatNumber).join(', ') || '';
  }

  get totalAmount(): number {
  return this.booking?.bookedSeats.length * this.booking?.show.seatPrice || 0;
  }

  goHome(): void {
    if (this.authService.isAdmin()) {
      this.router.navigate(['/admin-dashboard']);
    } else {
      this.router.navigate(['/']); // or user homepage
    }
  }

  downloadPdf():void{
   const bookingId=this.booking?.id;
   if(!bookingId){
    alert('No booking ID found!');
    return;
   }

   this.bookingService.downloadBookingPdf(bookingId)
   .subscribe((blob)=>{
     const url=window.URL.createObjectURL(blob);
     const a=document.createElement('a');
     a.href=url;
     a.download=`booking_${bookingId}.pdf`;
     a.click();
     window.URL.revokeObjectURL(url);
   },
   error=>{
     console.error('Error downloading pdf:',error);
   });
  }
}
