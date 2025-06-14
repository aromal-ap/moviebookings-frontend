import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SeatService {

  
  private baseUrl='http://localhost:8080/api/showseats';
  constructor(private http:HttpClient) { }
  getAllSeatsForShow(showId:number){
    return this.http.get<any[]>(`${this.baseUrl}/show/${showId}`);
  }
}
