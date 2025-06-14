import { Component, OnInit } from '@angular/core';
import { Movie, MovieService } from '../../../services/movie.service';
import { error } from 'console';
import { Router } from '@angular/router';

@Component({
  selector: 'app-managemovies',
  templateUrl: './managemovies.component.html',
  styleUrl: './managemovies.component.css'
})
export class ManagemoviesComponent implements OnInit{


  movies:Movie[]=[]; 
  constructor(private movieService:MovieService,
              private router:Router ){}

  ngOnInit(): void {
    this.loadMovies();
  }              
 
  loadMovies():void{
    this.movieService.getAllMovies().subscribe({
      next:(data)=>this.movies=data,
      error:(err)=>console.error("Error loading movies:",err)
    });
  }

  deleteMovie(id:number):void{
    if(confirm('Are you sure want to delete this movie?')){
      this.movieService.deleteMovie(id).subscribe({
        next :()=>{
           this.movies=this.movies.filter(movie=> movie.id!=id);
           alert('Movie deleted Successfully!');
        },
        error:(error: any)=>{
          console.error('Error deleting movie:',error);
        }
      });
    }
  }

  addMovie():void{
    this.router.navigate(['/admin/movies/add']);
  }
  editMovie(movie:Movie):void{
    this.router.navigate(['/admin/movies/edit',movie.id],{state:{movie}});
    // this.router.navigate(['/admin/movies/edit'], { 
    //    state: { movie }, 
    //    queryParams: { id: movie.id }
    // });

  }
}
