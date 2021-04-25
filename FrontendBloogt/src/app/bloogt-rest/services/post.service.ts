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
}
