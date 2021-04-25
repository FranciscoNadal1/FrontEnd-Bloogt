import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

import * as restURL from '../restURL';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private category: any = {

  };

  
  constructor(private http: HttpClient) { }
  
  public getAllCategories(): Observable<any> {    
    let returnObject = this.http.get(restURL.getAllCategories);
    return returnObject;
  }
}
