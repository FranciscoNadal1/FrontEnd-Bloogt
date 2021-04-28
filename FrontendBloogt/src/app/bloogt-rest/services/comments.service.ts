import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import * as restURL from '../restURL';
import { TokenStorageService } from 'src/app/login/service/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  private comments: any = {

  };
  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { }

  public getCommentsById(id : number): Observable<any> {     
    let url : string =  restURL.getCommentById;
    let newstr = url.replace("[[id]]", String(id)); 
    
    let returnObject = this.http.get(newstr);

    return returnObject;
  }

  public postComment(message: string, userId: number, postId: number): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.tokenStorage.getToken() });

    let options = { headers: headers };

    const data = {"message": message, "user_id": userId, "post_id": postId};

    return this.http.post<any>(restURL.postComment, data, options);
  }
}
