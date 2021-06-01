import { Input } from '@angular/core';
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
  selector: 'app-common-post-list',
  templateUrl: './common-post-list.component.html',
  styleUrls: ['./common-post-list.component.css']
})
export class CommonPostListComponent implements OnInit {

  dynamicForm: FormGroup;

  commentsOfPost: Map<number, any> = new Map<number, any>();

  private ngUnsubscribe = new Subject();
  private commentContent: any;


  public user: any = {};
  @Input()  loadingPostList;
  @Input() public post: any = {};
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
      try {
        this.ngOnInit();
      } finally {
      }
    });
     }

     changedContentComment(content: string) {  
      this.commentContent = content;
    }


     showHideCommentsOfPost(elem) {
      this.commentContent = "";
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
/*
      if (this.route.snapshot.params.hashtagName === undefined) {
  
        
        this.getQuickPostsOfFollowing();
        this.getReactionsOfPosts();
        this.loadingPostList = false
      } else {
        this.loadingPostList = false
        this.getPostsOfHashtag(this.route.snapshot.params.hashtagName);
        this.getReactionsOfPosts();
      }
  */
  
      this.getReactionsOfPosts();
    }
  
    onSubmit(postId) {
  
      
  
      this.postComment(this.commentContent, postId);
  
     // this.commentContent = null;
      /*
      this.dynamicForm = this.formBuilder.group({
        commentForm: ['', Validators.required]
      });
      */
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

    sharePost(id: number) {
     // this.getReactionsOfPosts();
  
      this.postservice.sharePost(id).subscribe(() => {

        
        this.post.forEach(element => {
          /*
          element.isShared = true;

          console.log("this Id = " + id);
          console.log("element Id = " + element.id);
          console.log("this.username- " + this.username);
        
          console.log(element);
          */
          if (element.id === id) {



           // console.log(element);
            element.isShared = true;
            const data = {
              "username": this.username
            };
            element.sharedBy = data
            
            element.sharedAt = Date.now();
            //element.sharedBy.username = this.username;
  
           // if (this.mapPostReactions.get(Number(id)) === false)
  
           // this.getReactionsOfPosts();
          }


        });
        
       
        this.getReactionsOfPosts();
      },
        (error) => {
          console.log(error);
        });
  
    }
    unsharePost(id: number) {
   
       this.postservice.unsharePost(id).subscribe(() => {
 
         
         this.post.forEach(element => {

           if (element.id === id) {
             element.isShared = false;
             element.sharedBy = null
           } 
         });
         
        
         this.getReactionsOfPosts();
       },
         (error) => {
           console.log(error);
         });
   
     }


    thumbUpPost(id: number) {
      this.getReactionsOfPosts();
  
      this.postservice.likePost(id).subscribe(() => {
        this.post.forEach(element => {
          if (element.id === id) {
            element.positiveReactions++;
  
            if (this.mapPostReactions.get(Number(id)) === false)
              element.negativeReactions--;
  
          }
        });
        this.getReactionsOfPosts();
      },
        (error) => {
          console.log(error);
        });
  
    }

    deletePostReaction(id: number, trueOrFalse: boolean) {
      this.getReactionsOfPosts();
  
      this.postservice.deletePostReaction(id).subscribe(() => {
        this.post.forEach(element => {
          if (element.id === id) {
            if(trueOrFalse === true)
              element.positiveReactions--;
              this.mapPostReactions.clear();
  //          if (this.mapPostReactions.get(Number(id)) === false)
  
            if(trueOrFalse === false)
              element.negativeReactions--;
  
          }
        });
        this.getReactionsOfPosts();
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
  
          }
        });
        
        this.getReactionsOfPosts();
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
