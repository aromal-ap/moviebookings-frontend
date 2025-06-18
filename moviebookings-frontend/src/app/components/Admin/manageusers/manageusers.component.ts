import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../../services/profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manageusers',
  templateUrl: './manageusers.component.html',
  styleUrl: './manageusers.component.css'
})
export class ManageusersComponent implements OnInit{

  users:any[]=[];

  constructor(private profileService:ProfileService,
              private router:Router ){};

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers():void{
    this.profileService.getAllUsers().subscribe({
        next:(data)=>{
          this.users=data;
        },
        error:(err)=>{
          console.error('Failed to load Users',err);
        }
    });
  }

  toggleStatus(user: any) {
    console.log(user.id);
    this.profileService.toggleUserStatus(user.email).subscribe({
      next: () => {
        user.enabled = !user.enabled;
        // this.loadUsers();
      },
      error: (err) => {
        console.error(err);
        alert('Failed to toggle status');
      }
    });
  } 

  deleteUser(email:string):void {
   this.profileService.deleteUser(email).subscribe({
     next:(res)=>{
      console.log(res);
      alert('User account deleted successfully');
      this.loadUsers();
     } ,
     error:(err)=>{
      console.error(err);
      alert('Failed to Delete the User account');
     }
   });
  }
}
