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

}
