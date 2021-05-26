import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { TokenStorageService } from 'src/app/login/service/token-storage.service';
import * as restURL from '../restURL';

@Injectable({
  providedIn: 'root'
})
export class SearchService {



  public searchUser(username: string): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    let url : string =  restURL.searchUser;
    let newstr = url.replace("[[username]]", String(username));

    let options = { headers: headers };


    return this.http.get<any>(newstr, options);
  }

  public searchHashtag(hashtag: string): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    let url : string =  restURL.searchHashtag;
    let newstr = url.replace("[[hashtag]]", String(hashtag));

    let options = { headers: headers };


    return this.http.get<any>(newstr, options);
  }


  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { }
}
