import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { IsAuthGuard } from './guards/isAuth.guard';
import { IsNotAuthGuard } from './guards/isNotAuth.guard';
import { SettingsComponent } from './components/settings/settings.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent, canActivate: [IsNotAuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [IsNotAuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [IsAuthGuard] },
  { path: 'settings', component: SettingsComponent, canActivate: [IsAuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    IsAuthGuard,
    IsNotAuthGuard
  ]
})
export class AppRoutingModule { }
