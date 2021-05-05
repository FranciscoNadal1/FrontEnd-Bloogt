import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import * as restURL from '../restURL';
import { TokenStorageService } from 'src/app/login/service/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private user: any = {

  };
  private following: any = {

  };


  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { }

  public createNewChat(username: string): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.tokenStorage.getToken()
    });
    let url : string =  restURL.createNewChat;
    let newstr = url.replace("[[username]]", username);

    let options = { headers: headers };

    const data = {    };

    return this.http.post<any>(newstr, data, options);
  }

  public getAllChats(): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.tokenStorage.getToken()
    });
    let url : string =  restURL.getAllChatsUser;
    let newstr = url;

    let options = { headers: headers };

    const data = {    };

    return this.http.get<any>(newstr, options);
  }


}
