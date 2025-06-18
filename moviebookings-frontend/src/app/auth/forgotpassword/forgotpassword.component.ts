import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.css'
})
export class ForgotpasswordComponent {

  email:string='';
  newPassword:string='';
  successMessage:string='';
  errorMessage:string='';

  constructor(private authService:AuthService,
              private router:Router ){};

  onSubmit():void{
    this.successMessage='';
    this.errorMessage='';
    this.authService.resetPassword(this.email,this.newPassword).subscribe({
      next:(res)=>{
        this.successMessage=res.message || 'Password updated Successfully';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error:(err)=>{
        console.error(err);
        this.errorMessage=err.error?.message || 'Password reset failed, Retry';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      }
    })
  }
}
