import { Component, OnInit } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { PostService } from '../../bloogt-rest/services/post.service';
import { UserService } from '../../bloogt-rest/services/user.service';
import { UserTokenService } from '../../login/service/user-token.service';

@Component({
  selector: 'app-left-bar',
  templateUrl: './left-bar.component.html',
  styleUrls: ['./left-bar.component.css']
})
export class LeftBarComponent implements OnInit {

  subscription: Subscription;
  public user: any = {   };
  public username: string;
  public userFollowing: any = {   };
  public userFollowed: any = {   };
  public trendingHashtags: any = {   };

  constructor(
    private userService: UserService,
    private postService: PostService,
    private userToken: UserTokenService) { }

  ngOnInit(): void {

    this.username = this.userToken.getLoggedUser()
    this.userService.getUserDetailsByUsername(this.username).subscribe(user => (this.user = user));

    this.subscription = timer(0, 10000).pipe(
      switchMap(() => this.userService.getFollowingUsers(this.username))
    ).subscribe(userFollowing => this.userFollowing = userFollowing);

    this.subscription = timer(0, 10000).pipe(
      switchMap(() => this.userService.getFollowedByUsers(this.username))
    ).subscribe(userFollowed => this.userFollowed = userFollowed);

    this.subscription = timer(0, 10000).pipe(
      switchMap(() => this.postService.getLastTrendingHashtag())
    ).subscribe(trendingHashtags => this.trendingHashtags = trendingHashtags);

    console.log(this.trendingHashtags);

  }

}
