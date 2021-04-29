import { Injectable } from '@angular/core';

import jwt_decode from 'jwt-decode';
import Swal from 'sweetalert2';

const TOKEN_KEY = '';

export interface JwtPayload {
  iss?: string;
  sub?: string;
  authorities?: string[] | string;
  aud?: string[] | string;
  exp?: number;
  nbf?: number;
  iat?: number;
  jti?: string;
}

@Injectable({
  providedIn: 'root'
})

export class TokenStorageService {

  constructor() { }

  signOut(): void {
   // window.sessionStorage.clear();
    localStorage.clear();
  }

  public saveToken(token: string): void {
    /*
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
    */
    localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
 //   return window.sessionStorage.getItem(TOKEN_KEY);
    return localStorage.getItem(TOKEN_KEY);
  }
  public isTokenExpired(): boolean{
    let decodedToken : JwtPayload = jwt_decode<JwtPayload>(this.getToken());
    let current_time = Date.now() / 1000;

    if(decodedToken.exp < current_time){
      return true;
    }
    return false;
  }
  public getDecodedToken(): JwtPayload {
    let current_time = Date.now() / 1000;
    let decodedToken : JwtPayload;
      try {
        decodedToken = jwt_decode<JwtPayload>(this.getToken());
        
        if(decodedToken.exp < current_time)
          throw new Error('expired');
      } catch (e) {
          Swal.fire('Session is invalid or expired');
          this.signOut();
    }
    return decodedToken;
  }

  public isTokenDefined(): boolean{
    if(localStorage.getItem(TOKEN_KEY) === null){
      return false;
    }
    else{
      return true;
    }
  }

}
