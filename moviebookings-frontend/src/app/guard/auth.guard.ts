import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = this.authService.getToken();

    if (token && !this.authService.isTokenExpired(token)) {
      return true;
    } else {
      localStorage.removeItem('token');
      alert('Please log in to access this page.');

      // Pass returnUrl as query param
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }
  }

  // canActivate(): boolean {
  // const token = this.authService.getToken();
  // if (token && !this.authService.isTokenExpired(token)) {
  //   return true;
  // } else {
  //   localStorage.removeItem('token');
  //   alert('Please log in to access this page.');
  //   this.router.navigate(['/login']);
  //   return false;
  // }
  // }

}
