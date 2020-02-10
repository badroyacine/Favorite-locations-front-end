import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SettingsService } from '../settings.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-user-infos',
  templateUrl: './update-user-infos.component.html',
  styleUrls: ['./update-user-infos.component.css']
})

export class UpdateUserInfosComponent implements OnInit {

  updateUserForm: FormGroup;
  loading: boolean = false;

  @Input() userName: string = '';
  @Input() userEmail: string = '';

  constructor(
    private fb: FormBuilder, 
    private settingsService: SettingsService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.updateUserForm = this.fb.group({
      name: [this.userName, [Validators.required]],
      email: [this.userEmail, [Validators.required, Validators.email]],
    })
  }

  get name(){ return this.updateUserForm.controls.name }
  get email(){ return this.updateUserForm.controls.email }

  updateUser(){
    this.loading = true;
    const userInformations = {
      name: this.name.value,
      email: this.email.value
    }
    this.settingsService.updateCurrentUser(userInformations).subscribe(
      response => {
        // console.log(response);
        this.loading = false;
        this.snackBar.open('Informations updated with success :)', null, {
          duration: 3000,
          verticalPosition: "bottom",
          horizontalPosition: "right",
          panelClass: ['snackbar-success']
        })
      },
      error => {
        // console.log(error);
        this.loading = false;
        this.snackBar.open('Error occured when updating informations', null, {
          duration: 4000,
          verticalPosition: "bottom",
          horizontalPosition: "right",
          panelClass: ['snackbar-danger']
        })
      } 
    )
  }

}
