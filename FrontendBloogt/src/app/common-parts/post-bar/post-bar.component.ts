import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { FileUploadService } from 'src/app/bloogt-rest/services/file-upload.service';
import { PostService } from 'src/app/bloogt-rest/services/post.service';
import Swal from 'sweetalert2';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { NgZone, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-post-bar',
  templateUrl: './post-bar.component.html',
  styleUrls: ['./post-bar.component.css']
})


export class PostBarComponent implements OnInit {



  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }


  //filedata: any;
  quickpost: FormGroup;
  imageArray: any[] = [];
  localImages: any[] = [];
  fileArray: any[] = [];


  constructor(
    private _ngZone: NgZone,
    private http: HttpClient,
    private postservice: PostService,
    private readonly fb: FormBuilder,
    private fileUpload: FileUploadService) {
    this.quickpost = this.fb.group({
      message: ['']
    });
  }
  
  @ViewChild('autosize', { static: false }) autosize: CdkTextareaAutosize;


  fileEvent(e) {
    const file: File = e.target.files[0];
    //let filedata = file;
    this.fileArray.push(file);


    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      this.localImages.push(e.target.result);
    }




  }

  static getUrlFromImageId(id: string): string {
    let url: string = "http://localhost:8998/api/files/view/image/";
    return url.concat(id);
  }

  ngOnInit(): void {
    this.imageArray = [];
    this.localImages = [];
  }

  eliminateImage(id) {

    this.fileArray.splice(id, id + 1);
    this.localImages.splice(id, id + 1);


  }
  async uploadFilesAndGetDirection() {

    let imageAuxArray = [];
    let fileupload = this.fileUpload

    for (const file of this.fileArray) {
      let json: any = await fileupload.postFile(file).toPromise();

      if (json.status === 'OK') {
        console.log(json)
        imageAuxArray.push(PostBarComponent.getUrlFromImageId(json.fileId));
      }
    }


    return imageAuxArray;
  }


  createQuickPost(imageArray: string[]) {

    this.postservice.createNewQuickMessage(
      this.quickpost.value.message, imageArray
    ).then(
      res => {
        if (res.status === 'OK') {
          console.log("Quickpost created")
        }
        if (res.status !== 'OK') {
          console.log("Quickpost not created")
        }
      }
    );
  }

  async newQuickPost() {
    var imageArray = this.imageArray
    Swal.fire({
      title: 'Are you sure?',
      text: "¿Do you want to post this?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, send it!'
    }).then(async (result) => {
      if (result.isConfirmed) {



        var arraVari = await this.uploadFilesAndGetDirection();

        this.createQuickPost(await arraVari);

        this.localImages = [];
        this.fileArray = [];

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
