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

  public getMoreLikedPostLastHour(category: string): Observable<any> {

    let url: string = restURL.moreLikedPostLasHour;
    let newstr = url.replace("[[category]]", String(category));

    let returnObject = this.http.get(newstr);

    return returnObject;
  }

  public lastsPostsExceptCategory(category: string): Observable<any> {

    let url: string = restURL.lastsPostsExceptCategory;
    let newstr = url.replace("[[category]]", String(category));

    let returnObject = this.http.get(newstr);

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

  public getLastTrendingHashtag(): Observable<any> {
   
    let returnObject = this.http.get(restURL.getLastTrendingHashtag);

    return returnObject;
  }

  public getAllPostsOfHashtag(hashtag: string): Observable<any> {

    let url: string = restURL.getAllPostsOfHashtag;
    let newstr = url.replace("[[hashtag]]", String(hashtag));

    let returnObject = this.http.get(newstr);

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

  public getPostById(id: number): Observable<any> {
    let url: string = restURL.getPostById;
    let newstr = url.replace("[[id]]", String(id));

    let returnObject = this.http.get(newstr);

    return returnObject;
  }

  public getPostByUsername(username: string): Observable<any> {
    let url: string = restURL.getPostByUsername;
    let newstr = url.replace("[[username]]", String(username));

    let returnObject = this.http.get(newstr);

    return returnObject;
  }


  public createNewQuickMessage(message: string, imageArray): Promise<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.tokenStorage.getToken()
    });

    let options = { headers: headers };


    var arraVari = []

    const data = {
      "content": message,
      "title": "QuickPost",
      "category": "QuickPost",
      "imagePost": imageArray
    };


    return this.http.post(restURL.createNewPost, data, options).toPromise();
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
       // console.error(e.error.mensaje);
        return throwError(e);
      })

    );
  }

  public sharePost(id: number): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.tokenStorage.getToken()
    });

    let url: string = restURL.sharePostById;
    let newstr = url.replace("[[id]]", String(id));

    let options = { headers: headers };

    return this.http.put<any>(newstr, null, options).pipe(
      map((response: any) => response.cliente),
      catchError(e => {
        if (e.status != 'OK') {
          return throwError(e);
        }
       // console.error(e.error.mensaje);
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
      //  console.error(e.error.mensaje);
        return throwError(e);
      })

    );
  }

  public postReactionsUser(username: string, reaction: string): Observable<any> {

    let url: string = restURL.getPostReactionsOfUser;
    let newstr = url.replace("[[username]]", String(username));
    newstr = newstr.replace("[[reaction]]", String(reaction));


    let returnObject = this.http.get(newstr);

    return returnObject;

  }
}
