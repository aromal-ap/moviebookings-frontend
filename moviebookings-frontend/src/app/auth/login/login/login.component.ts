import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'console';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email:string='';
  password:string='';
  errorMessage:string='';

  constructor(private authService: AuthService,
              private router: Router,
              private route:ActivatedRoute) {}

  onSubmit() {
    this.authService.login(this.email, this.password).subscribe({
      next: (res: any) => {
        this.authService.storeToken(res.token);

        const role=this.authService.getUserRoleFromToken();
        if(role === 'ROLE_ADMIN'){
          this.router.navigate(['/admin-dashboard']);
        }
        // Read returnUrl or fallback to home
        else{
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.router.navigateByUrl(returnUrl);
        }
      },
      error: (err) => {
        this.errorMessage = 'Invalid email or password';
      }
    });
  }


  // onSubmit(){
  //   this.authService.login(this.email, this.password).subscribe({
  //     next: (res:any) => {
  //       //localStorage.setItem('token',res.token);
  //       this.authService.storeToken(res.token);
  //       // Optional: store role/email too if needed
  //       //localStorage.setItem('role', res.role);
  //       //localStorage.setItem('email', res.email);

  //       // Redirect after login
  //       //this.router.navigate(['/']);
  //       window.location.href = '/'; // Full reload with token available
  //     },
  //     error: (err) => {
  //       this.errorMessage = 'Invalid email or password';
  //     }
  //   });
  // }
}
