import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map, catchError, tap } from 'rxjs/operators';
import { of, Observable, throwError } from 'rxjs';

import * as restURL from '../restURL';
import { TokenStorageService } from 'src/app/login/service/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private post: any = {

  };


  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { }

  public getAllPosts(): Observable<any> {
    let returnObject = this.http.get(restURL.getAllPosts);

    return returnObject;
  }

  public getAllQuickPosts(): Observable<any> {
    let returnObject = this.http.get(restURL.getAllQuickPosts);

    return returnObject;
  }

  public getAllQuickPostsOfFollowing(): Observable<any> {

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.tokenStorage.getToken()
    });

    let options = { headers: headers };

    let returnObject = this.http.get(restURL.getAllQuickPostsOfFollowing, options);

    return returnObject;
  }

  
  public getReactionsOfPost(): Observable<JSON> {

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.tokenStorage.getToken()
    });

    let options = { headers: headers };

    let returnObject = this.http.get<JSON>(restURL.getReactionsOfPost, options);
    return returnObject;
  }

  public getPostById(id : number): Observable<any> {
    let url : string =  restURL.getPostById;
    let newstr = url.replace("[[id]]", String(id)); 

    let returnObject = this.http.get(newstr);

    return returnObject;
  }

  public getPostByUsername(username: number): Observable<any> {
    let url : string =  restURL.getPostByUsername;
    let newstr = url.replace("[[username]]", String(username));
    
    let returnObject = this.http.get(newstr);

    return returnObject;
  }


  public createNewQuickMessage(message: string): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.tokenStorage.getToken()
    });

    let options = { headers: headers };

    const data =   {
      "content": message,
      "title": "QuickPost",
      "category": "QuickPost",
      "imagePost": null
    };

    return this.http.post<any>(restURL.createNewPost, data, options);
  }

  public likePost(id: number): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.tokenStorage.getToken()
    });

    let url: string = restURL.likePostById;
    let newstr = url.replace("[[id]]", String(id));

    let options = { headers: headers };

    return this.http.put<any>(newstr, null, options).pipe(
      map((response: any) => response.cliente),
      catchError(e => {
        if (e.status != 'OK') {
          return throwError(e);
        }
        console.error(e.error.mensaje);
        return throwError(e);
      })

    );
  }
  public dislikePost(id: number): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.tokenStorage.getToken()
    });

    let url: string = restURL.dislikePostById;
    let newstr = url.replace("[[id]]", String(id));

    let options = { headers: headers };

    return this.http.put<any>(newstr, null, options).pipe(
      map((response: any) => response.cliente),
      catchError(e => {
        if (e.status != 'OK') {
          return throwError(e);
        }
        console.error(e.error.mensaje);
        return throwError(e);
      })

    );
  }
}
