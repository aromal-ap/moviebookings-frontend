import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login/login.component';
import { AuthGuard } from './guard/auth.guard';
import { LandingComponent } from './components/landing/landing.component';
import { RegisterComponent } from './auth/register/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ShowComponent } from './components/show/show.component';
import { SeatBookingComponent } from './components/seat-booking/seat-booking.component';
import { BookingdetailsComponent } from './components/bookingdetails/bookingdetails.component';
import { BookinghistoryComponent } from './components/bookinghistory/bookinghistory.component';
import { AdmindashboardComponent } from './components/Admin/admindashboard/admindashboard.component';
import { RoleGuard } from './guard/role.guard';
import { ManagemoviesComponent } from './components/Admin/managemovies/managemovies.component';
import { AdminaddmovieComponent } from './components/Admin/adminaddmovie/adminaddmovie.component';
import { AdmineditmovieComponent } from './components/Admin/admineditmovie/admineditmovie.component';
import { ManageshowsComponent } from './components/Admin/manageshows/manageshows.component';
import { AdminaddshowComponent } from './components/Admin/adminaddshow/adminaddshow.component';
import { AdmineditshowComponent } from './components/Admin/admineditshow/admineditshow.component';
import { ManagescreensComponent } from './components/Admin/managescreens/managescreens.component';
import { AdminaddscreenComponent } from './components/Admin/adminaddscreen/adminaddscreen.component';
import { AdmineditscreenComponent } from './components/Admin/admineditscreen/admineditscreen.component';
const routes: Routes = [
  {path:'admin/screens/edit/:id',component:AdmineditscreenComponent},
  {path:'admin/screens/add',component:AdminaddscreenComponent},
  {path:'admin/screens',component:ManagescreensComponent},
  {path:'admin/shows/edit/:id',component:AdmineditshowComponent},
  {path:'admin/shows/add',component:AdminaddshowComponent},
  {path:'admin/shows',component:ManageshowsComponent},
  {path:'admin/movies/add',component:AdminaddmovieComponent},
  {path:'admin/movies/edit/:id',component:AdmineditmovieComponent},
  {path:'admin/movies',component:ManagemoviesComponent},
  {path:'login',component: LoginComponent},
  {path:'admin-dashboard',component: AdmindashboardComponent, canActivate:[RoleGuard]},
  {path:'history',component: BookinghistoryComponent},
  {path:'booking-details',component:BookingdetailsComponent},
  {path:'book/:showId',component:SeatBookingComponent, canActivate:[AuthGuard]},
  {path: 'shows/:movieId',component: ShowComponent},
  {path:'profile',component: ProfileComponent,canActivate:[AuthGuard]},
  {path:'register',component:RegisterComponent},
  {path:'',component: LandingComponent},
  //{ path: '', redirectTo: 'login', pathMatch: 'full' },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
