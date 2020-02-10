import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { AddLocationComponent } from './add-location/add-location.component';
import { DeleteLocationComponent } from './delete-location/delete-location.component';
import { EditLocationComponent } from './edit-location/edit-location.component';
import { LocationService } from '../../services/location.service';
import { Location } from '../../models/location.model';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  styles = environment.styles;
  lat = 51.678418;
  lng = 7.809007;
  locations: Location [] = [];
  page: number = 1;
  totalElements: number;

  constructor(
    public dialog: MatDialog,
    private locationService: LocationService
  ) { }

  ngOnInit() {
    this.locationService.getAllLocations().subscribe(
      (response:any) => {
        this.locations = response.locations;
        this.totalElements = response.totalLocations;
        this.lat = this.locations[0].latitude;
        this.lng = this.locations[0].longitude;
      }
    )
  }

  addLocation(){
    const dialogRef = this.dialog.open(AddLocationComponent, {
      width: '40%',
      data: {
        autoComplete: true
      }
    });

    dialogRef.afterClosed().subscribe(
      location => {
        if(location){
          this.locations.push(location);
        }
      }
    );
  }

  onMapClicked(event){
    const dialogRef = this.dialog.open(AddLocationComponent, {
      width: '40%',
      data: {
        latitude: event.coords.lat,
        longitude: event.coords.lng,
        autoComplete: false
      }
    });

    dialogRef.afterClosed().subscribe(
      location => {
        if(location){
          this.locations.push(location);
        }
      }
    );
  }

  editLocation(location){
    const dialogRef = this.dialog.open(EditLocationComponent, {
      width: '40%',
      data: {
        locationId: location._id,
        location
      }
    });

    dialogRef.afterClosed().subscribe(
      result => {
        if(result){
          this.locations = this.locations.map((location: Location) => {
            return location._id === result._id ? result : location;
          });
        }
      }
    );
  }

  deleteLocation(location){
    const dialogRef = this.dialog.open(DeleteLocationComponent, {
      width: '450px',
      data: {
        locationId: location._id
      }
    });

    dialogRef.afterClosed().subscribe(
      result => {
        if(result){
          let index = this.locations.indexOf(location);
          this.locations.splice(index, 1);
        }
      }
    );
  }
}