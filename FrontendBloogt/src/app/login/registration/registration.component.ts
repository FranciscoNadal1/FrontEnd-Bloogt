import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/bloogt-rest/services/user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { catchError } from 'rxjs/operators';
import { LoginServiceService } from '../service/login-service.service';
import { TokenStorageService } from '../service/token-storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  registrationForm: FormGroup;

  constructor(private readonly fb: FormBuilder,
    private http: HttpClient,
    private loginservice: LoginServiceService,
    private tokenStorage: TokenStorageService,
    private userservice: UserService) { 

      this.registrationForm = this.fb.group({
        name: [''],
        username: [''],
        avatar: [''],
        password: [''],
        surname: [''],
        email: [''],
      });

    }


  registerUser(){

    this.loginservice.createUser(
      this.registrationForm.value.name,
      this.registrationForm.value.username,
      this.registrationForm.value.avatar,
      this.registrationForm.value.password,
      this.registrationForm.value.surname,
      this.registrationForm.value.email
      ).subscribe(
      res => {
        if(res.status === 'OK'){

          Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            }
          })

          this.tokenStorage.saveToken(res.generatedToken);


          window.location.href = '/login';
        }
      }
);


  }

}
