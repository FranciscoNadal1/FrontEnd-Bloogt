import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map, catchError, tap } from 'rxjs/operators';
import { of, Observable, throwError } from 'rxjs';

import * as restURL from '../restURL';
import { TokenStorageService } from 'src/app/login/service/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  private comments: any = {

  };
  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { }

  public getAllCommentsOfUsername(username: string): Observable<any> {

    let url: string = restURL.getAllCommentsOfUser;
    let newstr = url.replace("[[username]]", String(username));
console.log(newstr);
    let returnObject = this.http.get(newstr);

    return returnObject;
  }
  public getCommentsById(id: number): Observable<any> {
    let url: string = restURL.getCommentById;
    let newstr = url.replace("[[id]]", String(id));

    let returnObject = this.http.get(newstr);

    return returnObject;
  }

  public postComment(message: string, postId: number): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.tokenStorage.getToken()
    });

    let options = { headers: headers };

    const data = { "message": message, "post_id": postId };

    return this.http.post<any>(restURL.postComment, data, options);
  }

  public likeComment(id: number): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.tokenStorage.getToken()
    });

    let url: string = restURL.likeCommentById;
    let newstr = url.replace("[[id]]", String(id));

    let options = { headers: headers };


    return this.http.put<any>(newstr, null, options).pipe(
      map((response: any) => response.cliente),
      catchError(e => {
        if (e.status != "OK") {
          return throwError(e);
        }
        console.error(e.error.mensaje);
        return throwError(e);
      })

    );
  }
  public dislikeComment(id: number): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.tokenStorage.getToken()
    });

    let url: string = restURL.dislikeCommentById;
    let newstr = url.replace("[[id]]", String(id));

    let options = { headers: headers };

    return this.http.put<any>(newstr, null, options).pipe(
      map((response: any) => response.cliente),
      catchError(e => {
        if (e.status != "OK") {
          return throwError(e);
        }
        console.error(e.error.mensaje);
        return throwError(e);
      })
    );
  }

  public sortComments(comments, sortMethod : string) {
    if(sortMethod === "older"){
      comments.sort(function (a, b) {
        if (a.createdAt < b.createdAt) {
          return 1;
        }
        if (a.createdAt > b.createdAt) {
          return -1;
        }
        return 0;
      });
    }

    if(sortMethod === "newer"){
      comments.sort(function (a, b) {
        if (a.createdAt > b.createdAt) {
          return 1;
        }
        if (a.createdAt < b.createdAt) {
          return -1;
        }
        return 0;
      });
    }
    if(sortMethod === "worst"){
      comments.sort(function (a, b) {
        if (a.negativeReactions < b.negativeReactions) {
          return 1;
        }
        if (a.negativeReactions > b.negativeReactions) {
          return -1;
        }
        return 0;
      });
    }
    if(sortMethod === "best"){
      comments.sort(function (a, b) {
        if (a.positiveReactions < b.positiveReactions) {
          return 1;
        }
        if (a.positiveReactions > b.positiveReactions) {
          return -1;
        }
        return 0;
      });
    }     
    
    return comments;
  }
}
