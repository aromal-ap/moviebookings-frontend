import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// export interface Show{
//   id:number;
//   movieId:number;
//   screenId:number;
//   seatPrice:number;
//   showTime:date;
// }
@Injectable({
  providedIn: 'root'
})
export class ShowService {

  private baseUrl='http://localhost:8080/api/shows';
  constructor(private http:HttpClient) { }

  getShowsByMovieId(movieId:number):Observable<any[]>{
    return this.http.get<any[]>(`${this.baseUrl}/movie/${movieId}`);
  }
  getShowById(showId: number): Observable<any> {
  return this.http.get<any>(`${this.baseUrl}/${showId}`);
  }

  getAllShows():Observable<any[]>{
    return this.http.get<any[]>(`${this.baseUrl}`);
  }

  deleteShow(showId:number):Observable<void>{
    return this.http.delete<void>(`${this.baseUrl}/${showId}`);
  }

  addShow(show:any):Observable<any>{
    return this.http.post<any>(`${this.baseUrl}`,show);
  }

  updateShow(showId:number,show:any):Observable<any>{
    return this.http.put<any>(`${this.baseUrl}/${showId}`,show);
  }
}
