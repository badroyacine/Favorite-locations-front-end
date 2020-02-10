import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl: string = environment.url;
  private isAuthenticated: boolean = false;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  getIsAuthenticated(){ 
    return this.isAuthenticated;
  }

  setIsAuthenticated(isAuth){
    this.isAuthenticated = isAuth;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  updateAuthStatusListener(value: boolean) {
    this.authStatusListener.next(value);
  }

  registerNewUser(data){
    return this.http.post<any>(`${this.baseUrl}/users/signup`, data);
  }

  loginUser(data){
    return this.http.post<any>(`${this.baseUrl}/users/login`, data);
  }

  logoutUser(){
    return this.http.get<any>(`${this.baseUrl}/users/logout`);
  }
}
