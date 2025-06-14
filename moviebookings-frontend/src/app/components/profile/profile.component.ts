import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { Router } from '@angular/router';
import { error } from 'console';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})

export class ProfileComponent implements OnInit{

  user:any={name:'',email:'',role:''}
  isEditing=false;
  newPassword: string = '';
  confirmPassword: string = '';
  passwordMismatch: boolean = false;
  constructor(private profileService: ProfileService, private router:Router){}
  ngOnInit(): void {
   this.loadProfile();
  }

  loadProfile() {
    this.profileService.getProfile().subscribe({
      next: (data) => {
        console.log('Loaded user:', data);
        this.user={
          name:data.name,
          email:data.email,
          role:data.role
        }
      },
      error: (err) =>{
         console.error('Profile load error:', err);
         if(err.status===401 || err.status===403){
            localStorage.removeItem('token');
            this.router.navigate(['/login']);
         }
      }   
    });
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  updateProfile(){
    this.profileService.updateProfile(this.user).subscribe({
      next:(data)=> {
        this.user=data;
        this.isEditing=false;
        alert("Profile updated");
        // this.router.navigate(['/profile']);
        this.loadProfile(); // reload details
      },  
      error:(err)=> console.error("Update failed:",err)
    });
  }

  deleteAccount() {
  if (confirm("Are you sure you want to delete your account")) {
    this.profileService.deleteAccount().subscribe({
      next: () => {
        alert("Account deleted");
        localStorage.removeItem('token');
        // this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        //   this.router.navigate(['/login']);
        // });
        this.router.navigate(['/login']);
      },
      error: (err) => console.error("Delete failed:", err)
    });
  }
  }

  changePassword() {
  if (this.newPassword !== this.confirmPassword) {
    this.passwordMismatch = true;
    return;
  }

  this.passwordMismatch = false;

  this.profileService.changePassword(this.newPassword).subscribe({
    next: (res) => {
      console.log(res.message);
      alert(res.message);
      this.newPassword = '';
      this.confirmPassword = '';
    },
    error: (err: any) => {
      console.error('Password update failed:', err);
      alert('Failed to update password');
    }
  });
}
}
