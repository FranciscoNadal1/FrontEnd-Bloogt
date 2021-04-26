import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

import * as restURL from '../restURL';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  private comments: any = {

  };
  constructor(private http: HttpClient) { }

  public getCommentsById(id : number): Observable<any> {     
    let url : string =  restURL.getCommentById;
    let newstr = url.replace("[[id]]", String(id)); 
    
    let returnObject = this.http.get(newstr);

    return returnObject;
  }
}
