import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { catchError } from 'rxjs/operators';
import {LoginServiceService} from '../../service/login-service.service';
import {TokenStorageService} from '../../service/token-storage.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;


  constructor(
    private readonly fb: FormBuilder,
    private http: HttpClient,
    private loginservice: LoginServiceService,
    private tokenStorage: TokenStorageService) {

    this.loginForm = this.fb.group({
      username: ['admin'],
      password: ['123456']
    });
  }

  login(){


    this.loginservice.loginToRest(this.loginForm.value.username, this.loginForm.value.password).subscribe(
      res => {
        if(res.status === 'OK'){

          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'You have succesfully logged on',
            showConfirmButton: false,
            timer: 2500
          });

          this.tokenStorage.saveToken(res.generatedToken);


          window.location.href = '/';
        }
      }
);

  }

}
