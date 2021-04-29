import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import {LoginServiceService} from './service/login-service.service';
import { ProfileComponent } from './component/login/profile/profile.component';
import { RegistrationComponent } from './registration/registration.component';


const loginRoutes: Routes = [
  { path: 'login',  component: LoginComponent },
  { path: 'registration',  component: RegistrationComponent }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(loginRoutes)
  ],
  exports: [
    RouterModule,
    LoginComponent,
    ProfileComponent,
    RegistrationComponent
  ],
  providers: [LoginServiceService],
  declarations: [LoginComponent, ProfileComponent, RegistrationComponent],
  bootstrap: [LoginComponent],

})
export class LoginRoutingModule { }