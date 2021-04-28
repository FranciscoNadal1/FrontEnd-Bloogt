import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PostService } from "../../bloogt-rest/services/post.service";
import { CommentsService } from "../../bloogt-rest/services/comments.service";
import { UserTokenService } from 'src/app/login/service/user-token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {
  public post: any = {   };
  public comments: any = {   };
  public id: number;

  constructor(
    public userToken: UserTokenService,
    private route: ActivatedRoute,
    private postservice: PostService,
    private commentservice: CommentsService

    ) { }

  ngOnInit() {

    let id = this.route.snapshot.params.id;
    this.postservice.getPostById(id).subscribe(post => (this.post = post));
    this.commentservice.getCommentsById(id).subscribe(comments => (this.comments = comments));
  }

  postComment(message, user, postId){
    console.log(postId);
    
    var message: any = message;
    var userIdN: number = user;
    var postIdN: number = +postId;
    
    this.commentservice.postComment(message, userIdN, postIdN).subscribe(
      res => {
        if(res.status === 'OK'){

          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your comment was published',
            showConfirmButton: false,
            timer: 500
          })
          window.location.reload();
        }else{
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your comment was published',
            showConfirmButton: false,
            timer: 500
          })


        }
      }
);
  }
}
