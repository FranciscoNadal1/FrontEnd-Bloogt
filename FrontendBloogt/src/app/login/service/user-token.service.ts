import { Injectable } from '@angular/core';
import {TokenStorageService} from './token-storage.service';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserTokenService {

  constructor(private tokenStorage: TokenStorageService) { }

  getLoggedUser(): string{
    if(this.isUserLogged){
      let decoded = this.tokenStorage.getDecodedToken();
      return decoded.sub;
    }
  }

  getAuthoritiesOfToken(): string[] | string{
    if(this.isUserLogged){
      let decoded = this.tokenStorage.getDecodedToken();
      return decoded.authorities;
    }
  }


  isUserLogged(){
    if(this.tokenStorage.isTokenDefined() === true) {
      return true;
    }
    else{
      return false;
    }
  }


  logoutUser(){
    this.tokenStorage.signOut();
    window.location.href="/";
  }

}
