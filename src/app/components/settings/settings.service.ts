import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  baseUrl: string = environment.url;

  constructor(private http: HttpClient) { }

  getCurrentUserInformations(){
    return this.http.get<any>(`${this.baseUrl}/users/me`);
  }

  updateCurrentUser(data){
    return this.http.put<any>(`${this.baseUrl}/users/updateMe`, data);
  }

  updateUserPassword(data){
    return this.http.put(`${this.baseUrl}/users/updateMyPassword`, data);
  }

}
