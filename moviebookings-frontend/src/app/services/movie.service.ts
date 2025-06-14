import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

export interface Movie {
  id: number;
  title: string;
  description: string;
  duration: number;
  posterUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private movieUrl='http://localhost:8080/api/movies';
  constructor(private http:HttpClient,
              private router:Router) { }
  getAllMovies():Observable<Movie[]>{
    return this.http.get<Movie[]>(this.movieUrl);
  }

  getMovieById(id: number): Observable<Movie> {
    return this.http.get<Movie>(`${this.movieUrl}/${id}`);
  }

  deleteMovie(id:number):Observable<void>{
    return this.http.delete<void>(`${this.movieUrl}/${id}`)
  }

  addMovie(movie:Movie):Observable<Movie>{
    return this.http.post<Movie>(`${this.movieUrl}`,movie);
  }

  updateMovie(id:number,movie:Movie):Observable<Movie>{
    return this.http.put<Movie>(`${this.movieUrl}/${id}`,movie);
  }
}
