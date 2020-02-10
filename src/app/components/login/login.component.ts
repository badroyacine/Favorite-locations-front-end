import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errorMessage: string;
  showDangerMessage: boolean = false;

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  get email(){ return this.loginForm.controls.email }
  get password(){ return this.loginForm.controls.password }

  signInUser(){

    if(this.loginForm.invalid){
      this.email.markAsTouched();
      this.password.markAsTouched();
      return;
    }

    const userData = {
      email: this.email.value,
      password: this.password.value
    }
    this.authService.loginUser(userData).subscribe(
      response => {
        console.log('response : ',response);
        localStorage.setItem('userLoggedIn', JSON.stringify(response.user));
        this.authService.updateAuthStatusListener(true);
        this.authService.setIsAuthenticated(true);
        this.router.navigate(['/dashboard']);
      },
      error => {
        console.log('error dans register', error);
        this.showDangerMessage = true;
        if(error.status === 401) this.errorMessage = 'Incorrect email or password';
        else this.errorMessage = 'Something went wrong :( Please try later';
      }
    )
  }

}
