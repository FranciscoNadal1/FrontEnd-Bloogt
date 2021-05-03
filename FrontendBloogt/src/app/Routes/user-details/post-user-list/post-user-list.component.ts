import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    private userToken: UserTokenService) { }

  ngOnInit(): void {

    this.username = this.route.snapshot.params.username;
    this.postservice.getPostByUsername(this.username).subscribe(postsOfUser => (this.postsOfUser = postsOfUser));
  }

}
