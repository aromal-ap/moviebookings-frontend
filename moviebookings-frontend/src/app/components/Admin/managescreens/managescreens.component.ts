import { Component, OnInit } from '@angular/core';
import { Screen, ScreenService } from '../../../services/screen.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-managescreens',
  templateUrl: './managescreens.component.html',
  styleUrl: './managescreens.component.css'
})
export class ManagescreensComponent implements OnInit{

  screens:Screen[]=[];
  constructor(private screenService:ScreenService,
              private router:Router  ){};

  ngOnInit():void{
    this.loadScreens();
  }

  loadScreens():void{
    this.screenService.getAllScreens().subscribe({
      next: (data) => this.screens = data,
      error: (err) => console.error('Failed to load screens:', err)
    });
  }

  addScreen():void{
    this.router.navigate(['/admin/screens/add']);
  }

  editScreen(screen:Screen):void{
    this.router.navigate(['/admin/screens/edit',screen.id]);
  }

  deleteScreen(id:number):void{
    if(confirm('Are you sure you want to delete the Screen')){
      this.screenService.deleteScreen(id).subscribe({
        next:()=>{
          alert('Screen deleted successfully!');
          this.loadScreens();
        },
        error:(err)=>{
          console.error('Error deleting the Screen:',err);
          alert('Error deleting the Screen');
        }
      })
    }
  }
}
