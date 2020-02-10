import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LocationService } from 'src/app/services/location.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-location',
  templateUrl: './delete-location.component.html',
  styleUrls: ['./delete-location.component.css']
})
export class DeleteLocationComponent implements OnInit {

  locationId: string;
  loading: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<DeleteLocationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private locationService: LocationService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.locationId = this.data.locationId;
  }

  deleteLocation(){
    this.loading = true;
    this.locationService.deleteLocation(this.locationId).subscribe(
      (response: any) => {
        this.dialogRef.close(this.locationId);
        this.snackBar.open('Favorite location deleted :)', null, {
          duration: 3000,
          verticalPosition: "bottom",
          horizontalPosition: "right",
          panelClass: ['snackbar-success']
        })
      },
      error=> {
        this.loading = false;
        this.dialogRef.close();
        this.snackBar.open('Error occured when deleting location', null, {
          duration: 4000,
          verticalPosition: "bottom",
          horizontalPosition: "right",
          panelClass: ['snackbar-danger']
        })
      }
    )
  }
}
