import { Injectable } from '@angular/core';
import { TokenStorageService } from 'src/app/login/service/token-storage.service';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import * as restURL from '../restURL';
import { Observable } from 'rxjs/internal/Observable';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { }


  public getUnreadNotifications(): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.tokenStorage.getToken()
    });

    let url : string =  restURL.notificationCount;
    let newstr = url;

    let options = { headers: headers };


    return this.http.get<any>(newstr, options);
  }
  public getSelfNotifications(): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.tokenStorage.getToken()
    });

    let url : string =  restURL.getSelfNotifications;
    let newstr = url;

    let options = { headers: headers };


    return this.http.get<any>(newstr, options);
  }


}
