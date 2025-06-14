import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MovieService } from '../../../services/movie.service';


@Component({
  selector: 'app-adminaddmovie',
  templateUrl: './adminaddmovie.component.html',
  styleUrl: './adminaddmovie.component.css'
})
export class AdminaddmovieComponent implements OnInit{

movieForm!:FormGroup;
submitted=false;

constructor(private fb:FormBuilder,
            private router:Router,
            private movieService:MovieService){}

ngOnInit(): void {
  this.movieForm=this.fb.group({
   title:['',Validators.required],
   description:['',Validators.required],
   duration:['',Validators.required],
   posterUrl:['',Validators.required]
  })
}

onSubmit():void{
  this.submitted=true;
  if(this.movieForm.invalid) return; 
  this.movieService.addMovie(this.movieForm.value).subscribe({
   next : ()=> this.router.navigate(['/admin/movies']),
   error : (err: any) =>console.error(err)
  });
}

redirect(){
  this.router.navigate(['/admin/movies'])
}

get f(){
  return this.movieForm.controls;
}
}
