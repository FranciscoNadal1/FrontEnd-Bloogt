import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import * as restURL from '../restURL';
import { TokenStorageService } from 'src/app/login/service/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: any = {

  };
  private following: any = {

  };


  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { }

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

  public getFollowingUsers(username: string): Observable<JSON> {
    let url : string =  restURL.getFollowingUsersByUsername;
    let newstr = url.replace("[[username]]", username);

    let returnObject = this.http.get<JSON>(newstr);

    return returnObject;
  }

  public getFollowedByUsers(username: string): Observable<any> {
    let url : string =  restURL.getFollowedByUsersByUsername;
    let newstr = url.replace("[[username]]", username);

    let returnObject = this.http.get(newstr);

    return returnObject;
  }

  public followUser(username: string): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.tokenStorage.getToken()
    });

    let options = { headers: headers };

    let url : string =  restURL.followUser;
    let newstr = url.replace("[[username]]", username);

    const data =   {    };

    return this.http.post<any>(newstr, data, options);
  }

  public unfollowUser(username: string): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.tokenStorage.getToken()
    });
    let url : string =  restURL.unfollowUser;
    let newstr = url.replace("[[username]]", username);

    let options = { headers: headers };

    const data = {    };

    return this.http.post<any>(newstr, data, options);
  }


}
