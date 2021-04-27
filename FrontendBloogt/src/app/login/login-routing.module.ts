import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';


const loginRoutes: Routes = [
  { path: 'login',  component: LoginComponent }
];

@NgModule({
  imports: [
    ReactiveFormsModule,
    RouterModule.forChild(loginRoutes)
  ],
  exports: [
    RouterModule
  ],
  declarations: [LoginComponent],
  bootstrap: [LoginComponent],
  
})
export class LoginRoutingModule { }