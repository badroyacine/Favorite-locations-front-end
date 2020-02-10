import { Component, OnInit, Inject, NgZone, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { LocationService } from 'src/app/services/location.service';
import { MapsAPILoader } from '@agm/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.css']
})

export class AddLocationComponent implements OnInit {

  private geoCoder;
  addLocationForm: FormGroup;
  loading: boolean = false;
  showErrors: boolean = false;
  latitude: number;
  longitude: number;
  errorMessage: string;
  autoComplete: boolean = true;

  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor(
    public dialogRef: MatDialogRef<AddLocationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private locationService: LocationService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.longitude = +this.data.longitude;
    this.latitude = +this.data.latitude;
    this.autoComplete = this.data.autoComplete;

    this.addLocationForm = this.fb.group({
      locationName: ['', Validators.required],
      comment: ['', []]
    });

    if(this.autoComplete){
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
  }

  get locationName(){ return this.addLocationForm.controls.locationName }
  get comment(){ return this.addLocationForm.controls.comment }

  addLocation(){
    this.loading = true;
    const locationData = {
      locationName: this.searchElementRef.nativeElement.value,
      latitude: this.latitude,
      longitude: this.longitude,
      comment: this.comment.value
    }
    this.locationService.addNewLocation(locationData).subscribe(
      (response: any) => {
        this.dialogRef.close(response.data.location);
        this.snackBar.open('New favorite location added :)', null, {
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
