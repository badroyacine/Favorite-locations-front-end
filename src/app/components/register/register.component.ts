import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { passwordValidation } from '../../shared/validators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  showDangerMessage: boolean = false;
  errorMessage: string;

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.initForm();
    this.registerForm.controls.password.valueChanges.subscribe(
      event => this.registerForm.controls.passwordConfirm.updateValueAndValidity()
    )
  }

  get name(){ return this.registerForm.controls.name }
  get email(){ return this.registerForm.controls.email }
  get password(){ return this.registerForm.controls.password }
  get passwordConfirm(){ return this.registerForm.controls.passwordConfirm }

  signUpUser(){

    if(this.registerForm.invalid){
      this.email.markAsTouched();
      this.name.markAsTouched();
      this.password.markAsTouched();
      this.passwordConfirm.markAsTouched();
      return;
    }

    const userData = {
      name: this.name.value,
      email: this.email.value,
      password: this.password.value,
      passwordConfirm: this.passwordConfirm.value
    }
    
    this.authService.registerNewUser(userData).subscribe(
      response => {
        console.log(response);
        localStorage.setItem('userLoggedIn', JSON.stringify(response.user));
        this.authService.updateAuthStatusListener(true);
        this.authService.setIsAuthenticated(true);
        this.router.navigate(['/dashboard']);
      },
      error => {
        console.log('error dans register', error);
        this.showDangerMessage = true;
        if(error.status === 400){
          this.errorMessage = error.error.message;
        } else{
          this.errorMessage = 'Something went wrong :( Please try later';
        }
      }
    )
  }

  initForm(){
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirm: ['', [Validators.required, Validators.minLength(6), passwordValidation]],
    });
  }

}
