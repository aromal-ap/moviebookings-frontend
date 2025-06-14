import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { Movie, MovieService } from '../../../services/movie.service';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrl: './admindashboard.component.css'
})
export class AdmindashboardComponent implements OnInit{

  movies:Movie[]=[];
  constructor(private authService:AuthService,
              private router:Router,
              private movieService:MovieService){}

  ngOnInit(): void {
    this.loadMovies();
  }              
 
  loadMovies():void{
    this.movieService.getAllMovies().subscribe({
      next:(data)=>this.movies=data,
      error:(err)=>console.error("Error loading movies:",err)
    });
  }

  isLoggedIn(): boolean {
    return !!this.authService.getToken();
  }

  logout():void{
    this.authService.logout();
   // this.router.navigate(['/']);
  }
}
