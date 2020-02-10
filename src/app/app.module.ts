import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { AddLocationComponent } from './components/dashboard/add-location/add-location.component';
import { DeleteLocationComponent } from './components/dashboard/delete-location/delete-location.component';
import { EditLocationComponent } from './components/dashboard/edit-location/edit-location.component';
import { SettingsComponent } from './components/settings/settings.component';
import { UpdateUserInfosComponent } from './components/settings/update-user-infos/update-user-infos.component';
import { UpdateUserPasswordComponent } from './components/settings/update-user-password/update-user-password.component';

import { SettingsService } from './components/settings/settings.service';
import { LocationService } from './services/location.service';
import { AuthInterceptor } from './services/auth.interceptor';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from "@agm/snazzy-info-window";
import { NgxPaginationModule } from 'ngx-pagination';
import { FooterComponent } from './components/footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HeaderComponent,
    DashboardComponent,
    HomeComponent,
    AddLocationComponent,
    DeleteLocationComponent,
    EditLocationComponent,
    SettingsComponent,
    UpdateUserInfosComponent,
    UpdateUserPasswordComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    AgmCoreModule.forRoot({
      apiKey: 'YOUR-API-KEY',
      libraries: ['places']
    }),
    AgmSnazzyInfoWindowModule,
    NgxPaginationModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    SettingsService,
    LocationService
  ],
  entryComponents: [
    AddLocationComponent,
    EditLocationComponent,
    DeleteLocationComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
