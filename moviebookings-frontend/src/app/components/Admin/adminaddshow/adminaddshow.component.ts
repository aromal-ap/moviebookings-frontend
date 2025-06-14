import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MovieService } from '../../../services/movie.service';
import { ShowService } from '../../../services/show.service';
import { ScreenService } from '../../../services/screen.service';

@Component({
  selector: 'app-adminaddshow',
  templateUrl: './adminaddshow.component.html',
  styleUrl: './adminaddshow.component.css'
})
export class AdminaddshowComponent implements OnInit{

  showForm!:FormGroup;
  movies:any[]=[];
  screens:any[]=[];

  constructor(private fb:FormBuilder,
              private router:Router,
              private movieService:MovieService,
              private showService:ShowService,
              private screenService:ScreenService ){};

  ngOnInit(): void {
    this.showForm=this.fb.group({
      movieId:['',Validators.required],
      screenId:['',Validators.required],
      seatPrice:['',[Validators.required,Validators.min(1)]],
      showTime:['',Validators.required]
    });
    this.loadMovies();
    this.loadScreens();
  }    
  
  loadMovies(){
    this.movieService.getAllMovies().subscribe((data)=>{
      this.movies=data;
    });
  }

  loadScreens(){
    this.screenService.getAllScreens().subscribe((data)=>{
      this.screens=data;
    });
  }

  onSubmit(){
  if(this.showForm.invalid) return;

  let rawShowTime = this.showForm.value.showTime;
  if(rawShowTime && rawShowTime.length === 16){
    rawShowTime += ':00';  // Append seconds
  }

  const show = {
    movie: { id: this.showForm.value.movieId },
    screen: { id: this.showForm.value.screenId },
    seatPrice: this.showForm.value.seatPrice,
    showTime: rawShowTime
  };

  //console.log('showdetail:', show);
  this.showService.addShow(show).subscribe({
    next:()=>{
      alert('Show added successfully!');
      this.router.navigate(['/admin/shows']);
    },
    error:(err)=> {
      console.error('Fail to add show: ', err);
      alert('Failed to add show.');
    }
  });
}


  cancel(){
    this.router.navigate(['/admin/shows']);
  }
}
