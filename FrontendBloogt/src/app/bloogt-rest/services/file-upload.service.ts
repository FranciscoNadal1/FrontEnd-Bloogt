import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { TokenStorageService } from 'src/app/login/service/token-storage.service';
import * as restURL from '../restURL';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {



  postFile(fileToUpload: File){

    let headers = new HttpHeaders({
      'Content-Type': 'multipart/form-data',
      'Authorization': this.tokenStorage.getToken()
    });

    const formData = new FormData();

    formData.append("uploaded-file", fileToUpload);

   
    
    return  this.httpClient.post(restURL.uploadFiles, formData);
}



  constructor(private httpClient: HttpClient, private tokenStorage: TokenStorageService) { }
}
