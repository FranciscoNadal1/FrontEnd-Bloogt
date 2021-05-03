import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/bloogt-rest/services/post.service';
import { UserService } from 'src/app/bloogt-rest/services/user.service';
import { UserTokenService } from 'src/app/login/service/user-token.service';
import { Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css']
})
export class FollowersComponent implements OnInit {

  subscription: Subscription;
  public userFollowing: any = {   };
  public userFollowed: any = {   };
  public username: string;

  constructor(
    private route: ActivatedRoute,
    private userservice: UserService,
    private postservice: PostService,
    private userToken: UserTokenService) { }

  ngOnInit(): void {
    this.username = this.route.snapshot.params.username;

    this.subscription = timer(0, 100000).pipe(
      switchMap(() => this.userservice.getFollowedByUsers(this.username))
    ).subscribe(userFollowed => this.userFollowed = userFollowed);
  }

}
