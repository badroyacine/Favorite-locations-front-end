import { Component, OnInit, Inject, ElementRef, ViewChild, NgZone } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LocationService } from 'src/app/services/location.service';
import { MapsAPILoader } from '@agm/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-location',
  templateUrl: './edit-location.component.html',
  styleUrls: ['./edit-location.component.css']
})
export class EditLocationComponent implements OnInit {

  private geoCoder;
  editLocationForm: FormGroup;
  locationId: string;
  latitude: number;
  longitude: number;
  errorMessage: string;
  loading: boolean = false;
  showErrors: boolean = false;

  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor(
    public dialogRef: MatDialogRef<EditLocationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private locationService: LocationService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.locationId = this.data.locationId;
    this.latitude = +this.data.location.latitude;
    this.longitude = +this.data.location.longitude;
    
    this.editLocationForm = this.fb.group({
      locationName: [this.data.location.locationName, Validators.required],
      comment: [this.data.location.comment, []]
    });

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      this.geoCoder = new google.maps.Geocoder;
 
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: []
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
 
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
 
          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
        });
      });
    });
  }

  get locationName(){ return this.editLocationForm.controls.locationName }
  get comment(){ return this.editLocationForm.controls.comment }

  editLocation(){
    this.loading = true;
    const locationData = {
      locationName: this.searchElementRef.nativeElement.value,
      latitude: this.latitude,
      longitude: this.longitude,
      comment: this.comment.value
    }
    this.locationService.updateLocation(locationData, this.locationId).subscribe(
      (response: any) => {
        // console.log('data from edit location', response);
        this.dialogRef.close(response.location);
        this.snackBar.open('Favorite location edited :)', null, {
          duration: 3000,
          verticalPosition: "bottom",
          horizontalPosition: "right",
          panelClass: ['snackbar-success']
        })
      },
      error=> {
        this.loading = false;
        this.showErrors = true;
        if(error.status === 400) this.errorMessage = 'Invalid inputs! Please select a location from the list';
        else this.errorMessage = 'Error occured on the server! please try later';
      }
    )
  }

}
