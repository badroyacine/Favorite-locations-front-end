import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit{

    constructor(private authService: AuthService){}

    ngOnInit(){
      if(localStorage.getItem('userLoggedIn')){
        console.log('user connected!!');
        this.authService.setIsAuthenticated(true);
        this.authService.updateAuthStatusListener(true);
      }
    }
}
