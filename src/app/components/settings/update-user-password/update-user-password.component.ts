import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SettingsService } from '../settings.service';
import { passwordValidation } from '../../../shared/validators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-user-password',
  templateUrl: './update-user-password.component.html',
  styleUrls: ['./update-user-password.component.css']
})
export class UpdateUserPasswordComponent implements OnInit {

  updateUserPasswordForm: FormGroup;
  loading: boolean = false;
  showErrors: boolean = false;
  errorMessage: string;

  constructor(
    private fb: FormBuilder, 
    private settingsService: SettingsService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.updateUserPasswordForm = this.fb.group({
      passwordCurrent: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirm: ['', [Validators.required, Validators.minLength(6), passwordValidation]],
    });

    this.updateUserPasswordForm.controls.password.valueChanges.subscribe(
      event => this.updateUserPasswordForm.controls.passwordConfirm.updateValueAndValidity()
    )
  }

  get passwordCurrent(){ return this.updateUserPasswordForm.controls.passwordCurrent }
  get password(){ return this.updateUserPasswordForm.controls.password }
  get passwordConfirm(){ return this.updateUserPasswordForm.controls.passwordConfirm }

  updatePassword(){
    if(this.updateUserPasswordForm.invalid){
      this.passwordCurrent.markAsTouched();
      this.password.markAsTouched();
      this.passwordConfirm.markAsTouched();
      return;
    }
    this.loading = true;

    const data = {
      passwordCurrent: this.passwordCurrent.value,
      password: this.password.value,
      passwordConfirm: this.passwordConfirm.value
    }
    this.settingsService.updateUserPassword(data).subscribe(
      response => {
        // console.log(response)
        this.loading = false;
        this.showErrors = false;
        
        this.passwordCurrent.clearValidators();
        this.password.clearValidators();
        this.passwordConfirm.clearValidators();
        this.updateUserPasswordForm.reset();

        this.snackBar.open('Password updated with success :)', null, {
          duration: 3000,
          verticalPosition: "bottom",
          horizontalPosition: "right",
          panelClass: ['snackbar-success']
        })
      },
      error => {
        // console.log(error);
        this.loading = false;
        if(error.status === 401){
          this.showErrors = true;
          this.errorMessage = "The password entered is not correct! Please provide your correct password."
        } 
        else{
          this.snackBar.open('Error occured when updating the password', null, {
            duration: 5000,
            verticalPosition: "bottom",
            horizontalPosition: "right",
            panelClass: ['snackbar-danger']
          })
        }
      } 
    )
  }

}
