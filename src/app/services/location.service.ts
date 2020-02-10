import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Location } from '../models/location.model';

@Injectable()
export class LocationService {

  baseUrl: string = environment.url;
  userId: string;
  
  constructor(private http: HttpClient) {
    if(localStorage.getItem('userLoggedIn')){
      this.userId = JSON.parse(localStorage.getItem('userLoggedIn'))._id;
    }
  }

  addNewLocation(data){
    return this.http.post<Location>(`${this.baseUrl}/users/${this.userId}/locations`, data);
  }

  updateLocation(data, locationId){
    return this.http.put<Location>(`${this.baseUrl}/users/${this.userId}/locations/${locationId}`, data);
  }

  deleteLocation(locationId){
    return this.http.delete(`${this.baseUrl}/users/${this.userId}/locations/${locationId}`);
  }

  getAllLocations(){
    return this.http.get(`${this.baseUrl}/users/${this.userId}/locations`);
  }
}
