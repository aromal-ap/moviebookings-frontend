import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS} from '@angular/common/http';
import { AuthInterceptor } from './interseptor/auth.interceptor';
import { LandingComponent } from './components/landing/landing.component';
import { RegisterComponent } from './auth/register/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ShowComponent } from './components/show/show.component';
import { SeatBookingComponent } from './components/seat-booking/seat-booking.component';
import { BookingdetailsComponent } from './components/bookingdetails/bookingdetails.component';
import { BookinghistoryComponent } from './components/bookinghistory/bookinghistory.component';
import { AdmindashboardComponent } from './components/Admin/admindashboard/admindashboard.component';
import { ManagemoviesComponent } from './components/Admin/managemovies/managemovies.component';
import { AdminaddmovieComponent } from './components/Admin/adminaddmovie/adminaddmovie.component';
import { AdmineditmovieComponent } from './components/Admin/admineditmovie/admineditmovie.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ManageshowsComponent } from './components/Admin/manageshows/manageshows.component';
import { AdminaddshowComponent } from './components/Admin/adminaddshow/adminaddshow.component';
import { AdmineditshowComponent } from './components/Admin/admineditshow/admineditshow.component';
import { ManagescreensComponent } from './components/Admin/managescreens/managescreens.component';
import { AdminaddscreenComponent } from './components/Admin/adminaddscreen/adminaddscreen.component';
import { AdmineditscreenComponent } from './components/Admin/admineditscreen/admineditscreen.component';
import { ForgotpasswordComponent } from './auth/forgotpassword/forgotpassword.component';
import { ManageusersComponent } from './components/Admin/manageusers/manageusers.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LandingComponent,
    RegisterComponent,
    ProfileComponent,
    ShowComponent,
    SeatBookingComponent,
    BookingdetailsComponent,
    BookinghistoryComponent,
    AdmindashboardComponent,
    ManagemoviesComponent,
    AdminaddmovieComponent,
    AdmineditmovieComponent,
    ManageshowsComponent,
    AdminaddshowComponent,
    AdmineditshowComponent,
    ManagescreensComponent,
    AdminaddscreenComponent,
    AdmineditscreenComponent,
    ForgotpasswordComponent,
    ManageusersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule
  ],
  providers: [
    provideClientHydration(),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
