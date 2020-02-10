import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      withCredentials: true
  });
  return next.handle(request).pipe(
    catchError(error => {
      if(error.status === 401) {
        this.authService.logoutUser().subscribe(
          response => {
            this.authService.updateAuthStatusListener(false);
            localStorage.removeItem('userLoggedIn');
            this.authService.setIsAuthenticated(false);
            this.router.navigate(['login']);
          }
        );
      }
      return throwError(error);
    })
  );
  }
}