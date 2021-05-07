import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UserService } from "../../bloogt-rest/services/user.service";


import { Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { PostService } from 'src/app/bloogt-rest/services/post.service';
import { UserTokenService } from 'src/app/login/service/user-token.service';
import Swal from 'sweetalert2';
import { ChatService } from 'src/app/bloogt-rest/services/chat.service';


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
    private postservice: PostService,
    private userToken: UserTokenService,
    private chatService: ChatService
    ) { }


  ngOnInit(): void {

    this.username = this.route.snapshot.params.username;



    this.userservice.getUserDetailsByUsername(this.username).subscribe(user => (this.user = user));
    this.postservice.getPostByUsername(this.username).subscribe(postsOfUser => (this.postsOfUser = postsOfUser));
    
/*
    this.subscription = timer(0, 1000).pipe(
      switchMap(() => this.postservice.getPostByUsername(username))
    ).subscribe(postsOfUser => this.postsOfUser = postsOfUser);
*/
    
this.userFollowing = this.userservice.getFollowingUsers(this.username).subscribe();
/*
    this.subscription = timer(0, 100000).pipe(
      switchMap(() => this.userservice.getFollowingUsers(this.username))
    ).subscribe(userFollowing => this.userFollowing = userFollowing);

    this.subscription = timer(0, 100000).pipe(
      switchMap(() => this.userservice.getFollowedByUsers(this.username))
    ).subscribe(userFollowed => this.userFollowed = userFollowed);
*/
    
   

  //  this.userservice.getFollowingUsers(username).subscribe(userFollowing => (this.userFollowing = userFollowing));
 //   this.userservice.getFollowedByUsers(username).subscribe(userFollowed => (this.userFollowed = userFollowed));
  }

  getMenuItem(): string{
    let menuItem = this.route.snapshot.params.menu;
    if(menuItem === undefined)
      return "postList";
    return menuItem;
  }

  followUser(username: string): void{
    this.isFollowing();
    this.userservice.followUser(this.username).subscribe();
  }
  unfollowUser(username: string): void{
    this.userservice.unfollowUser(this.username).subscribe();
  }

  async createChat(){
    const { value: text } = await Swal.fire({
      input: 'textarea',
      inputLabel: 'Message',
      inputPlaceholder: 'Type your message here...',
      inputAttributes: {
        'aria-label': 'Type your message here'
      },
      showCancelButton: true
    })
    
    if (text) {
    this.chatService.createNewChat(this.username, text).subscribe();
      Swal.fire("Meesage:</br>"+text +"</br> was sent")
    }
  }

  getLoggedUsername(): boolean{
      if(this.route.snapshot.params.username === this.userToken.getLoggedUser())
        return true;
    return false;
  }

  isFollowing(){/*
    this.userFollowing = this.userservice.getFollowingUsers(this.username).subscribe();
    console.log(this.userFollowing);
    */
    console.log(this.userFollowing);
    
    /*this.userFollowing.
    for(let user of this.userFollowing){
        console.log(user);
    }*/
  }

}
