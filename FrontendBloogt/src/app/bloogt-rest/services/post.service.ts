import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

import * as restURL from '../restURL';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private post: any = {

  };


  constructor(private http: HttpClient) { }

  public getAllPosts(): Observable<any> {
    let returnObject = this.http.get(restURL.getAllPosts);

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

}
