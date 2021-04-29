import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

import * as restURL from '../../bloogt-rest/restURL';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http: HttpClient) { }

  loginToRest(username: string, password: string): Observable<any> {
    const data = {"username": username, "password": password};

    return this.http.post<any>(restURL.login, data);
}

createUser(name: string, username: string, avatar: string, password: string, surname: string, email: string): Observable<any> {

  const data = {
    "name": name,
    "username": username,
    "avatar": avatar,
    "password": password,
    "surname": surname,
    "email": email
  };
  console.log(data);
  return this.http.post<any>(restURL.registerUser, data);
}

}
