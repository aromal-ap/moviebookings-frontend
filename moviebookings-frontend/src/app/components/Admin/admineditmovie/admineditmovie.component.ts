import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie, MovieService } from '../../../services/movie.service';

@Component({
  selector: 'app-admineditmovie',
  templateUrl: './admineditmovie.component.html',
  styleUrl: './admineditmovie.component.css'
})
export class AdmineditmovieComponent implements OnInit{

  movieForm!:FormGroup;
  submitted=false;
  movieId!:number;

  constructor(private router:Router,
              private fb:FormBuilder,
              private route:ActivatedRoute,
              private movieService:MovieService ){}

  ngOnInit(): void {
 
    //get movieId from route param
    this.movieId= Number(this.route.snapshot.paramMap.get('id'));
    console.log('movieId:',this.movieId);
    //initialize the form
    this.movieForm=this.fb.group({
      title:['',Validators.required],
      description:['',Validators.required],
      duration:[0,[Validators.required,Validators.min(1)]],
      posterUrl:['',Validators.required]
    });

    //get movie from navigation state
    const navigation=this.router.getCurrentNavigation();
    const movie:Movie= navigation?.extras.state?.['movie'];

    if(movie){
    // patch frm with movie data
    this.movieForm.patchValue({
      title:movie.title,
      description:movie.description,
      duration:movie.duration,
      posterUrl:movie.posterUrl
    });
    }
    else{
    // if no movie object Found, fallback to fetching via service
    this.movieService.getMovieById(this.movieId).subscribe({
      next : (movieData)=>{
        this.movieForm.patchValue({
          title:movieData.title,
          description:movieData.description,
          duration:movieData.duration,
          posterUrl:movieData.posterUrl
        });
      },
      error : (err)=>{
        console.error('Error fteching movie: ',err);
        //this.router.navigate(['/admin/movies']);
        alert('Failed to fetch movie. Please check the backend.');
      }
    });
    }
  }

  onSubmit():void{
    this.submitted=true;
    if(this.movieForm.invalid) return;

    const updatedMovie:Movie={
      id:this.movieId,
      ...this.movieForm.value
    };

    this.movieService.updateMovie(this.movieId,updatedMovie).subscribe({
      next :()=>{
        alert('Movie updated successfully!');
        this.router.navigate(['/admin/movies']);
      },
      error:(err)=>{
        console.error('Error updating movie: ',err);
      }
    })
  }

  redirect(){
    this.router.navigate(['/admin/movies']);
  }

  get f(){
    return this.movieForm.controls;
  }
}
