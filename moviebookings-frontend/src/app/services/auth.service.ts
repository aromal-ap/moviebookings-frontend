import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

interface LoginResponse{
  token:string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private baseUrl = 'http://localhost:8080/api/auth'; 

  constructor(private http: HttpClient) { }
  
  
  getEmailFromToken(): string {
    const token = localStorage.getItem('token');
    if (!token) return '';
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.sub; // assuming JWT stores email in "sub"
  }

  getUserRoleFromToken():string{
    const decode=this.getUserDetailsFromToken();
    return decode?.role || ''; // assumes token has role
  }

  isAdmin():boolean{
    return this.getUserRoleFromToken() === 'ROLE_ADMIN';
  }

  getUserDetailsFromToken(): any | null {
  const token = this.getToken();
  if (!token) return null;
  try {
    return jwtDecode(token);
  } catch (error) {
    console.error('Invalid token', error);
    this.logout(); // clear invalid token
    return null;
  }
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, { email, password });
  }

  register(user: { name: string; email: string; password: string }): Observable<any> {
  return this.http.post(`${this.baseUrl}/register`, user);
  }

  isLoggedIn(): boolean {
  const token = this.getToken();
  if (!token) return false;

  try {
    const decoded: any = jwtDecode(token);
    const exp = decoded.exp;
    const currentTime = Math.floor(Date.now() / 1000);
    return exp && exp > currentTime;
  } catch (error) {
    this.logout(); // Clear invalid token
    return false;
  }
  }

  getLoggedInEmail(): string | null {
  const token = this.getToken();
  if (!token) return null;
  try {
    const decoded: any = jwtDecode(token);
    return decoded.sub; // the email
  } catch {
    return null;
  }
  }
 
  isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expiry = payload.exp;
    return Math.floor(new Date().getTime() / 1000) > expiry;
  } catch (e) {
    return true;
  }
  }

  storeToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
  }


  logout(): void {
    localStorage.removeItem('token');
    window.location.href = '/';
  }
}
