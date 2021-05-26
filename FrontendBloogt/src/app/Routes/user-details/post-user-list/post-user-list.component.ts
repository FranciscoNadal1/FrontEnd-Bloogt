import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from 'src/app/bloogt-rest/services/post.service';
import { UserService } from 'src/app/bloogt-rest/services/user.service';
import { UserTokenService } from 'src/app/login/service/user-token.service';

@Component({
  selector: 'app-post-user-list',
  templateUrl: './post-user-list.component.html',
  styleUrls: ['./post-user-list.component.css']
})
export class PostUserListComponent implements OnInit {

  public postsOfUser: any = {   };
  public username: string;
  constructor(
    private route: ActivatedRoute,
    private userservice: UserService,
    private postservice: PostService,
    private userToken: UserTokenService,
    private router: Router) {

      router.events.subscribe((val) => {
        try {
          this.ngOnInit();
        } finally {
        }
      });
     }

  ngOnInit(): void {
    

    this.username = this.route.snapshot.params.username;
    if(this.getMenuItem() === 'postList')
      this.postservice.getPostByUsername(this.username).subscribe(postsOfUser => (this.postsOfUser = postsOfUser));
      
    if(this.getMenuItem() === 'postsLiked'){
      this.postservice.postReactionsUser(this.username, 'true').subscribe(postsOfUser => (this.postsOfUser = postsOfUser));
    }
    if(this.getMenuItem() === 'postsDisliked'){
      this.postservice.postReactionsUser(this.username, 'false').subscribe(postsOfUser => (this.postsOfUser = postsOfUser));
    }
    console.log(this.postservice)
  }

  getMenuItem(): string{
    let menuItem = this.route.snapshot.params.menu;
    if(menuItem === undefined)
      return "postList";
    return menuItem;
  }
}
