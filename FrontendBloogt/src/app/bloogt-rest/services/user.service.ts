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
  private following: any = {

  };


  constructor(private http: HttpClient) { }

  public getAllUsers(): Observable<any> {   
    
    let returnObject = this.http.get(restURL.getAllUsers);

    return returnObject;
  }
  
  public getUserDetailsByUsername(username : string): Observable<any> {     
    let url : string =  restURL.getUserDetailsByUsername;
    let newstr = url.replace("[[username]]", username); 
    
    let returnObject = this.http.get(newstr);

    return returnObject;
  }

  public getFollowingUsers(username : string): Observable<any> {     
    let url : string =  restURL.getFollowingUsersByUsername;
    let newstr = url.replace("[[username]]", username); 
    
    let returnObject = this.http.get(newstr);

    return returnObject;
  }

  public getFollowedByUsers(username : string): Observable<any> {     
    let url : string =  restURL.getFollowedByUsersByUsername;
    let newstr = url.replace("[[username]]", username); 
    
    let returnObject = this.http.get(newstr);

    return returnObject;
  }

}
