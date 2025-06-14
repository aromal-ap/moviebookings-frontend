import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShowService } from '../../services/show.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrl: './show.component.css'
})
export class ShowComponent implements OnInit{

   movieId:number=0;
   shows:any[]=[];

  constructor(private route:ActivatedRoute,
     private showService:ShowService,
     private router:Router){}

  ngOnInit(): void {
    this.movieId=Number(this.route.snapshot.paramMap.get('movieId'));
    this.loadShows();
  }

  loadShows(){
    this.showService.getShowsByMovieId(this.movieId).subscribe({
      next:(data)=>{
        this.shows=data;
      },
      error:(err)=>{
        console.error('error fetching shows',err);
      }
    });
  }

  bookNow(show:any){
    this.router.navigate(['/book',show.id],{
     state:{
      movieTitle: show.movie.title,
        posterUrl: show.movie.posterUrl,
        screenName: show.screen.screen,
        seatPrice: show.seatPrice,
        showTime: show.showTime
     }
    });
  }
}
