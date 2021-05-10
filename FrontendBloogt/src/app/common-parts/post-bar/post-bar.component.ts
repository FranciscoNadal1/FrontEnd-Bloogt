import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PostService } from 'src/app/bloogt-rest/services/post.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-post-bar',
  templateUrl: './post-bar.component.html',
  styleUrls: ['./post-bar.component.css']
})
export class PostBarComponent implements OnInit {

  quickpost: FormGroup;
  constructor(
    private postservice: PostService,
    private readonly fb: FormBuilder) {
    this.quickpost = this.fb.group({
      message: ['']
    });
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
          this.quickpost.value.message,
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
