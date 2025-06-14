import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  
  private baseUrl='http://localhost:8080/api/bookings';
  constructor(private http:HttpClient) { }

  createBooking(userId: number, showId: number, seatIds: number[]) {
    return this.http.post(`${this.baseUrl}/user/${userId}/show/${showId}`, seatIds);
  }

  getUserIdByEmail(email: string) {
    return this.http.get<number>(`${this.baseUrl}/email/id?email=${email}`);
  }

  getBookingsForUser(userId:number):Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/user/${userId}`);
  }

  downloadBookingPdf(bookingId:number):Observable<Blob>{
    const token=localStorage.getItem('token');
    const headers=new HttpHeaders({
     'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.baseUrl}/${bookingId}/download-pdf`,{
     headers:headers,
     responseType: 'blob'
    });
  }

}
