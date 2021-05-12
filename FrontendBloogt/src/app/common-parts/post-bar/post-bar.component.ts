import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { FileUploadService } from 'src/app/bloogt-rest/services/file-upload.service';
import { PostService } from 'src/app/bloogt-rest/services/post.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-post-bar',
  templateUrl: './post-bar.component.html',
  styleUrls: ['./post-bar.component.css']
})
export class PostBarComponent implements OnInit {

  filedata: any;
  quickpost: FormGroup;
  imageArray: string[] = [];

  constructor(
    private http: HttpClient,
    private postservice: PostService,
    private readonly fb: FormBuilder,
    private fileUpload: FileUploadService) {
    this.quickpost = this.fb.group({
      message: ['']
    });
  }

  fileEvent(e) {
    this.filedata = e.target.files[0];

    var myFormData = new FormData();

    this.fileUpload.postFile(this.filedata).subscribe(
      res => {
        if (res.status === 'OK') {
          this.imageArray.push(this.getUrlFromImageId(res.fileId));

        }
      }
    );


  }

  getUrlFromImageId(id: string): string {
    let url: string = "http://localhost:8998/api/files/view/image/"

    return url.concat(id);
  }

  ngOnInit(): void {
  }

  newQuickPost() {

    Swal.fire({
      title: 'Are you sure?',
      text: "¿Do you want to post this?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, send it!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.postservice.createNewQuickMessage(
          this.quickpost.value.message, this.imageArray
        ).subscribe(
          res => {
            if (res.status === 'OK') {

            }
          }
        );


        Swal.fire(
          'Done!',
          'Your post was made.',
          'success'
        );


        this.quickpost = this.fb.group({
          message: ['']
        });
      }
    })





  }
}
