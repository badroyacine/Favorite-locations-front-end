import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userIsAthenticated: boolean = false;
  username: string;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    console.log('dans le header');
    this.userIsAthenticated = this.authService.getIsAuthenticated();
    // if(this.userIsAthenticated){
    //   this.username = JSON.parse(localStorage.userLoggedIn).name;
    // }
    this.authService.getAuthStatusListener().subscribe(
      isAuth => {
        this.userIsAthenticated = isAuth
      //   if(this.userIsAthenticated){
      //     this.username = JSON.parse(localStorage.userLoggedIn).name;
      //   }
      }
    )
  }

  logout(){
    this.authService.logoutUser().subscribe(
      response => {
        console.log('response', response);
        this.userIsAthenticated = false;
        this.authService.updateAuthStatusListener(false);
        localStorage.removeItem('userLoggedIn');
        this.authService.setIsAuthenticated(false);
        this.router.navigate(['login']);
      }
    )
  }

}
