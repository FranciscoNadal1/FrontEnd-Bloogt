import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

import * as restURL from '../restURL';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: any = {

  };

  constructor(private http: HttpClient) { }

  public getAllUsers(): Observable<any> {   
    
    let returnObject = this.http.get(restURL.getAllUsers);

    return returnObject;
  }
}
