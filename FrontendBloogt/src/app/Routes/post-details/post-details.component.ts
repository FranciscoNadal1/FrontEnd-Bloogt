import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';

import { PostService } from '../../bloogt-rest/services/post.service';
import { CommentsService } from '../../bloogt-rest/services/comments.service';
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

  textAreaNewComment: string = '';

  constructor(
    @Inject(DOCUMENT) private document: Document,
    public userToken: UserTokenService,
    private route: ActivatedRoute,
    private postservice: PostService,
    private commentservice: CommentsService,
    private router: Router
    ) {

      router.events.subscribe((val) => {
        this.ngOnInit();
    });

    }

  ngOnInit() {
    this.getPostInfo();
    this.getComments();
    this.commentservice.sortComments(this.comments, "older");
  }

  sortComments(sortType){
    this.commentservice.sortComments(this.comments, sortType);
    }

  cleanTextAreaComments() {
    this.textAreaNewComment = '';
  }

  getPostInfo(): void{ 
    let id = this.route.snapshot.params.id;
    this.postservice.getPostById(id).subscribe(post => (this.post = post));
  }
  getComments(): void{
    let id = this.route.snapshot.params.id;
    this.commentservice.getCommentsById(id).subscribe(comments => (this.comments = comments));
  }

  refreshPage() {
    this.document.defaultView.location.reload();
  }

  thumbUpComment(id){
    this.commentservice.likeComment(id).subscribe(() => {
        this.comments.forEach(element => {
        if(element.id === id){
          element.positiveReactions++;
          element.totalReactions = element.totalReactions + 1;
        }
    } );
    },
    (error) => {
      console.log(error);
    });
  }
  thumbDownComment(id){
    this.commentservice.dislikeComment(id).subscribe(() => {
      this.comments.forEach(element => {
      if(element.id === id){
        element.negativeReactions++
        element.totalReactions = element.totalReactions + 1;
      }
    } );
  },
  (error) => {
    console.log(error);
  });

  }  


  
  postComment(message,  postId){
    var message: any = message;
    var postIdN: number = +postId;

    this.commentservice.postComment(message, postIdN).subscribe(
      res => {
        if(res.status === 'OK'){

          this.getComments();
          this.getPostInfo();

          Swal.fire({
            title: 'Comment added!',
            html: 'Your message :<br>'+message+' <br><br>Was added successfully',
            icon: 'success',
            showConfirmButton: false,
            timer: 1200
          });
          this.cleanTextAreaComments();
          //scrollToTop();
          //window.location.reload();
        }else{
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Your comment was not published',
            showConfirmButton: false,
            timer: 1200
          });


        }
      }
);
  }
}
