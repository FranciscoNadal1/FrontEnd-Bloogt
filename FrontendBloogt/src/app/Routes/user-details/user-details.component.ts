import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UserService } from "../../bloogt-rest/services/user.service";


import { Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { PostService } from 'src/app/bloogt-rest/services/post.service';


@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  subscription: Subscription;
  statusText: string;

  public user: any = {   };
  public postsOfUser: any = {   };
  public userFollowing: any = {   };
  public userFollowed: any = {   };
  public username: string;

  constructor(
    private route: ActivatedRoute, 
    private userservice: UserService,
    private postservice: PostService
    ) { }

  ngOnInit(): void {

    let username = this.route.snapshot.params.username;



    this.userservice.getUserDetailsByUsername(username).subscribe(user => (this.user = user));
    this.postservice.getPostByUsername(username).subscribe(postsOfUser => (this.postsOfUser = postsOfUser));
    
/*
    this.subscription = timer(0, 1000).pipe(
      switchMap(() => this.postservice.getPostByUsername(username))
    ).subscribe(postsOfUser => this.postsOfUser = postsOfUser);
*/
    
/*
    this.subscription = timer(0, 1000).pipe(
      switchMap(() => this.userservice.getFollowingUsers(username))
    ).subscribe(userFollowing => this.userFollowing = userFollowing);

    this.subscription = timer(0, 1000).pipe(
      switchMap(() => this.userservice.getFollowedByUsers(username))
    ).subscribe(userFollowed => this.userFollowed = userFollowed);
*/    

  //  this.userservice.getFollowingUsers(username).subscribe(userFollowing => (this.userFollowing = userFollowing));
 //   this.userservice.getFollowedByUsers(username).subscribe(userFollowed => (this.userFollowed = userFollowed));
  }

  

}
