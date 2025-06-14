import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Screen {
  id?: number;
  screen: string;
  totalSeats: number;
}

@Injectable({
  providedIn: 'root'
})
export class ScreenService {

  constructor(private http:HttpClient) { };

  private baseUrl='http://localhost:8080/api/screens';

  getAllScreens():Observable<Screen[]>{
    return this.http.get<Screen[]>(`${this.baseUrl}`);
  }

  getScreenById(id:number):Observable<Screen>{
    return this.http.get<Screen>(`${this.baseUrl}/${id}`);
  }

  addScreen(screen:Screen):Observable<Screen>{
    return this.http.post<Screen>(this.baseUrl,screen);
  }

  updateScreen(id:number,updatedScreen:Screen):Observable<Screen>{
    return this.http.put<Screen>(`${this.baseUrl}/${id}`,updatedScreen);
  }

  deleteScreen(id:number):Observable<void>{
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
