import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ShowService } from '../../../services/show.service';
import { MovieService } from '../../../services/movie.service';
import { ScreenService } from '../../../services/screen.service';

@Component({
  selector: 'app-admineditshow',
  templateUrl: './admineditshow.component.html',
  styleUrl: './admineditshow.component.css'
})
export class AdmineditshowComponent implements OnInit{
  
  showForm!:FormGroup;
  movies:any[]=[];
  screens:any[]=[];
  showId!:number;

  constructor(private fb:FormBuilder,
              private route:ActivatedRoute,
              private router:Router,
              private showService:ShowService,
              private movieService:MovieService,
              private screenService:ScreenService){};

  ngOnInit(): void {
    this.showForm=this.fb.group({
      movieId:['',Validators.required],
      screenId:['',Validators.required],
      seatPrice:['',[Validators.required,Validators.min(1)]],
      showTime:['',Validators.required]
    });

    this.showId=this.route.snapshot.params['id'];
    this.loadMovies();
    this.loadScreens();
    this.loadShowDetails();
  }

  loadMovies(){
    this.movieService.getAllMovies().subscribe(data=>{
       this.movies=data;
    });
  }

  loadScreens(){
    this.screenService.getAllScreens().subscribe(data=>{
      this.screens=data;
    });
  }

  loadShowDetails(){
    this.showService.getShowById(this.showId).subscribe({
      next:(data)=>{
        this.showForm.patchValue({
         movieId:data.movie.id,
         screenId:data.screen.id,
         seatPrice:data.seatPrice,
         showTime:this.formatDateTimeLocal(data.showTime)
        });
      },
      error:(err)=>{
        console.error('Error loading show details: ',err);
        alert('Error loading Show details!');
      }
    })
  }

  formatDateTimeLocal(dateTimeString:string):string{
    const dt=new Date(dateTimeString);
     // yyyy-MM-ddTHH:mm
    const formatted = dt.toISOString().slice(0, 16);
    return formatted;
  }

  onSubmit(){
    if(this.showForm.invalid) return;

    let rawShowTime = this.showForm.value.showTime;
    if (rawShowTime && rawShowTime.length === 16) {
      rawShowTime += ':00'; // Append seconds
    }

    const updatedShow={
      movie:{id:this.showForm.value.movieId},
      screen:{id:this.showForm.value.screenId},
      seatPrice:this.showForm.value.seatPrice,
      showTime:rawShowTime
    };

    this.showService.updateShow(this.showId,updatedShow).subscribe({
      next:()=>{
        alert('Show updated successfully!');
        this.router.navigate(['/admin/shows']);
      },
      error:(err)=>{
        console.error('Failed to update the show: ',err);
        alert('Failed to update the show!');
      }
    })
  }

  cancel() {
    this.router.navigate(['/admin/shows']);
  }

}
