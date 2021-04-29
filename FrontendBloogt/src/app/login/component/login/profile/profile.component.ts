import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/bloogt-rest/services/user.service';
import { TokenStorageService } from 'src/app/login/service/token-storage.service';
import { UserTokenService } from 'src/app/login/service/user-token.service';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public user: any = {   };
  public userFollowing: any = {   };
  public userFollowed: any = {   };
  public username : string;
  
  constructor(public userToken: UserTokenService, public tokenService: TokenStorageService, public userservice: UserService) {
    
    this.username = userToken.getLoggedUser();

    this.userservice.getUserDetailsByUsername(this.username).subscribe(user => (this.user = user));
    this.userservice.getFollowingUsers(this.username).subscribe(userFollowing => (this.userFollowing = userFollowing));
    this.userservice.getFollowedByUsers(this.username).subscribe(userFollowed => (this.userFollowed = userFollowed));

   }

  ngOnInit(): void {
  }

}
