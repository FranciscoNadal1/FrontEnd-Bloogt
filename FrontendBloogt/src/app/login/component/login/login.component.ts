import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private readonly fb: FormBuilder, private http: HttpClient) {
    this.loginForm = this.fb.group({
      username: ['admin'],
      password: ['123456']
    });
  }

  login(){


    
  }

}
