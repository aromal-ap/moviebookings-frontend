import { Component, OnInit } from '@angular/core';
import { ShowService } from '../../../services/show.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manageshows',
  templateUrl: './manageshows.component.html',
  styleUrl: './manageshows.component.css'
})
export class ManageshowsComponent implements OnInit{

  shows:any[]=[];

  constructor(private showService:ShowService,
              private router:Router ){};
  
  ngOnInit(): void {
    this.loadShows();
  }            

  loadShows():void{
    this.showService.getAllShows().subscribe({
      next:(data)=>{
        this.shows=data;
        // console.log('shows loaded',data);
      },
      error:(err)=>{
        console.error('Error loading shows: ',err);
      }
    })
  }

  editShow(show:any):void{
   // console.log('Navigating to edit:', show.id);
    this.router.navigate(['/admin/shows/edit',show.id]);
  }

  addShow():void{
    this.router.navigate(['/admin/shows/add']);
  }

  deleteShow(showId:number):void{
    if(confirm('Are you sure you want to delete the show?')){
      this.showService.deleteShow(showId).subscribe({
        next:()=>{
          alert('Show deleted successfully!');
          this.loadShows();
        },
        error:(err)=>{
          console.error('Eroor deleting Show: ',err);
          alert('Errror deleting the show.');
        }
      });
    }
  }
}
