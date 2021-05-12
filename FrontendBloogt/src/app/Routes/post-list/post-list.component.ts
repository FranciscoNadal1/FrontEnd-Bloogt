import { AfterViewInit, Component,  ElementRef,  OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Subject } from 'rxjs';
import { finalize } from 'rxjs/internal/operators/finalize';
import { takeUntil } from 'rxjs/operators';
import { UserTokenService } from 'src/app/login/service/user-token.service';
import { PostService } from '../../bloogt-rest/services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit{

  private ngUnsubscribe = new Subject();

  
  loadingPostList = true
  public post: any = {  };
  public postHash: any = {  };
  public postReactions: any = {
  };

  public mapPostReactions: Map<number, boolean> = new Map<number, boolean>();


  constructor(
    private element: ElementRef,
    private renderer: Renderer2,
    private route: ActivatedRoute,
    private postservice: PostService,
    public userToken: UserTokenService,
    private router: Router) {

    router.events.subscribe((val) => {
      //this.loading = true
      try{
      this.ngOnInit();
      }finally{
        //this.loading = false
      }
  });

  }

  ngOnInit() {
    this.loadingPostList = true
    if(this.route.snapshot.params.hashtagName === undefined){
    //  this.loadingPostList = false

      this.getQuickPostsOfFollowing();
      this.getReactionsOfPosts();
      this.loadingPostList = false
    }else{

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