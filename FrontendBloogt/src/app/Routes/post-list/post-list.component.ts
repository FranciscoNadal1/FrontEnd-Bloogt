import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, map, startWith, takeUntil } from 'rxjs/operators';
import { UserTokenService } from 'src/app/login/service/user-token.service';
import Swal from 'sweetalert2';
import { PostService } from "../../bloogt-rest/services/post.service";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {


  private ngUnsubscribe = new Subject();
  quickpost: FormGroup;

  public post: any = {  };
  public postHash: any = {  };
  public postReactions: any = {
  };

  public mapPostReactions: Map<number, boolean> = new Map<number, boolean>();

  constructor(
    private route: ActivatedRoute,
    private postservice: PostService, 
    private readonly fb: FormBuilder, 
    public userToken: UserTokenService,
    private router: Router) {
    this.quickpost = this.fb.group({
      message: ['']
    });

    router.events.subscribe((val) => {
      this.ngOnInit();
  });


    
  }

  ngOnInit() {
    if(this.route.snapshot.params.hashtagName === undefined){
      
      this.getQuickPostsOfFollowing();

      this.getReactionsOfPosts();
    }else{
console.log(this.route.snapshot.params.hashtagName)
      this.getPostsOfHashtag(this.route.snapshot.params.hashtagName);
      this.getReactionsOfPosts();
    }

  }

/////////////////



//////////////////
  PostReactionTrueOrFalse(id: number) :boolean{
    return this.mapPostReactions.get(Number(id));
  }
  getReactionsOfPosts() {

    this.postservice.getReactionsOfPost().subscribe(elements => {

     let size = Object.keys(elements).length;

     for(var i = 0;i != size;i++){
        this.mapPostReactions.set(elements[i].postId, elements[i].reaction);
     }

    },
      (error) => {
        console.log(error);
      });
  }

  getQuickPosts() {
    this.postservice.getAllQuickPosts().subscribe(post => (this.post = post));
  }

  getPostsOfHashtag(hashtag: string) {
    this.postservice.getAllPostsOfHashtag(hashtag)
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(postHash => (this.post = postHash.posts));
  }

  getQuickPostsOfFollowing() {
    this.postservice.getAllQuickPostsOfFollowing()    
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(post => (this.post = post));
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
        this.getQuickPostsOfFollowing();

        this.quickpost = this.fb.group({
          message: ['']
        });
      }
    })





  }

  thumbUpPost(id: number) {
    this.getReactionsOfPosts();

    this.postservice.likePost(id).subscribe(() => {
      this.post.forEach(element => {
        if (element.id === id) {
          element.positiveReactions++;
          
            if(this.mapPostReactions.get(Number(id)) === false)
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

            if(this.mapPostReactions.get(Number(id)) === true)
              element.positiveReactions--;
            
      this.getReactionsOfPosts();
        }
      });
    },
      (error) => {
        console.log(error);
      });
      
  }
}