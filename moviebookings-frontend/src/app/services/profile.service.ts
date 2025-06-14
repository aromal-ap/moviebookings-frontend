import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { text } from 'node:stream/consumers';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private baseUrl='http://localhost:8080/api/profile';
  constructor(private http:HttpClient) { }

  getTokenHeader():HttpHeaders{
    const token=localStorage.getItem('token');
    return new HttpHeaders({'Authorization': `Bearer ${token}`});
  }

  getProfile():Observable<any>{
    return this.http.get<any>(this.baseUrl,{
      headers:this.getTokenHeader()
    });
  }

  updateProfile(user:any):Observable<any>{
    return this.http.put<any>(this.baseUrl,user,{
      headers:this.getTokenHeader()
    });
  }

  deleteAccount(): Observable<any> {
  return this.http.delete(this.baseUrl, {
    headers: this.getTokenHeader(),
    responseType: 'text' // 👈 tell Angular to expect plain text
  });
  }

  changePassword(newPassword:string):Observable<any>{
    return this.http.put<any>(`${this.baseUrl}/change-password`,
      {password:newPassword},
      {headers:this.getTokenHeader()}
    );
  }
}
