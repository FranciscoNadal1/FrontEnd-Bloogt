import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Subject } from 'rxjs';
import { finalize } from 'rxjs/internal/operators/finalize';
import { takeUntil } from 'rxjs/operators';
import { CommentsService } from 'src/app/bloogt-rest/services/comments.service';
import { UserService } from 'src/app/bloogt-rest/services/user.service';
import { UserTokenService } from 'src/app/login/service/user-token.service';
import Swal from 'sweetalert2';
import { PostService } from '../../bloogt-rest/services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  myFormGroup: FormGroup;
  dynamicForm: FormGroup;

  commentsOfPost: Map<number, any> = new Map<number, any>();

  private ngUnsubscribe = new Subject();


  public user: any = {};
  loadingPostList = true
  public post: any = {};
  public postHash: any = {};
  public postReactions: any = {
  };

  public mapPostReactions: Map<number, boolean> = new Map<number, boolean>();


  public username: string;
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private commentservice: CommentsService,
    private element: ElementRef,
    private renderer: Renderer2,
    private route: ActivatedRoute,
    private postservice: PostService,
    public userToken: UserTokenService,
    private router: Router) {

    this.dynamicForm = this.formBuilder.group({
      commentForm: ['', Validators.required]
    });

    router.events.subscribe((val) => {
      //this.loading = true
      try {
        this.ngOnInit();
      } finally {
        //this.loading = false
      }
    });

  }


  showHideCommentsOfPost(elem) {
    if(this.commentsOfPost.get(elem)!==undefined){
      
      this.commentsOfPost.clear();
        return;
    }
    this.commentsOfPost.clear();

    let variable2 = this.commentservice.getCommentsById(elem).pipe(variable => (variable = variable));
    variable2.forEach(element => this.commentsOfPost.set(elem, element));

    if(this.commentsOfPost.get(elem)===undefined){
      this.commentsOfPost.set(elem, null)

    }


  }


  ngOnInit() {

    this.username = this.userToken.getLoggedUser()
    this.userService.getUserDetailsByUsername(this.username).subscribe(user => (this.user = user));


    this.loadingPostList = true
    if (this.route.snapshot.params.hashtagName === undefined) {

      console.log(this.route.snapshot.params.hashtagName)
      this.getQuickPostsOfFollowing();
      this.getReactionsOfPosts();
      this.loadingPostList = false
    } else {
      this.loadingPostList = false
      this.getPostsOfHashtag(this.route.snapshot.params.hashtagName);
      this.getReactionsOfPosts();
    }


  }

  onSubmit(postId) {


    this.postComment(this.dynamicForm.value.commentForm, postId);

    this.dynamicForm.value.commentForm = null;
    this.dynamicForm = this.formBuilder.group({
      commentForm: ['', Validators.required]
    });
  }
  /////////////////



  //////////////////
  PostReactionTrueOrFalse(id: number): boolean {
    return this.mapPostReactions.get(Number(id));
  }
  getReactionsOfPosts() {

    this.postservice.getReactionsOfPost().subscribe(elements => {

      let size = Object.keys(elements).length;

      for (var i = 0; i != size; i++) {
        this.mapPostReactions.set(elements[i].postId, elements[i].reaction);
      }

    },
      (error) => {
        console.log(error);
      });
  }

  getQuickPosts() {
    /*
    this.postservice.getAllQuickPosts().subscribe(post => (this.post = post));
*/
    this.postservice.getAllQuickPosts()
      .pipe(
        takeUntil(this.ngUnsubscribe),
        finalize(() => {
          this.loadingPostList = false
        }))
      .subscribe(post => (this.post = post));

  }

  getPostsOfHashtag(hashtag: string) {
    this.postservice.getAllPostsOfHashtag(hashtag)
      .pipe(
        takeUntil(this.ngUnsubscribe),
        finalize(() => {
          this.loadingPostList = false
        }))
      .subscribe(postHash => (this.post = postHash.posts));

  }

  getQuickPostsOfFollowing() {
    this.postservice.getAllQuickPostsOfFollowing()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(post => (this.post = post));
  }


  thumbUpPost(id: number) {
    this.getReactionsOfPosts();

    this.postservice.likePost(id).subscribe(() => {
      this.post.forEach(element => {
        if (element.id === id) {
          element.positiveReactions++;

          if (this.mapPostReactions.get(Number(id)) === false)
            element.negativeReactions--;

          this.getReactionsOfPosts();
        }
      });
    },
      (error) => {
        console.log(error);
      });

  }
  thumbDownPost(id) {
    this.getReactionsOfPosts();

    this.postservice.dislikePost(id).subscribe(() => {
      this.post.forEach(element => {
        if (element.id === id) {
          element.negativeReactions++;

          if (this.mapPostReactions.get(Number(id)) === true)
            element.positiveReactions--;

          this.getReactionsOfPosts();
        }
      });
    },
      (error) => {
        console.log(error);
      });

  }


  thumbUpComment(postId, id){
    this.commentservice.likeComment(id).subscribe(() => {

      this.commentsOfPost.get(postId).forEach(element => {
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
  thumbDownComment(postId, id){
    this.commentservice.dislikeComment(id).subscribe(() => {
      
      this.commentsOfPost.get(postId).forEach(element => {
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




  postComment(message, postId) {

    var message: any = message;
    var postIdN: number = +postId;

    this.commentservice.postComment(message, postIdN).subscribe(
      res => {
        if (res.status === 'OK') {


          Swal.fire({
            title: 'Comment added!',
            html: 'Your message :<br>' + message + ' <br><br>Was added successfully',
            icon: 'success',
            showConfirmButton: false,
            timer: 1200
          });


          this.showHideCommentsOfPost(postId);
          this.showHideCommentsOfPost(postId);

          this.post.forEach(element => {
            if (element.id === postId) {
              element.commentaryCount++;
            }
          });

        } else {
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