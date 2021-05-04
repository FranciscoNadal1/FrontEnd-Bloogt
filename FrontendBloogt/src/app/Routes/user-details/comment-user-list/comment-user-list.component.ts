import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentsService } from 'src/app/bloogt-rest/services/comments.service';

@Component({
  selector: 'app-comment-user-list',
  templateUrl: './comment-user-list.component.html',
  styleUrls: ['./comment-user-list.component.css']
})
export class CommentUserListComponent implements OnInit {

  public commentsOfUser: any = {   };
  public username: string;
  constructor( 
    private route: ActivatedRoute, 
    private commentservice: CommentsService) { }

  ngOnInit(): void {
    console.log(this.getMenuItem())
    this.username = this.route.snapshot.params.username;
    if(this.getMenuItem() === 'commentList')
      this.commentservice.getAllCommentsOfUsername(this.username).subscribe(commentsOfUser => (this.commentsOfUser = commentsOfUser));

    if (this.getMenuItem() === 'commentsLiked'){
      console.log("que mierdas pasa")
      this.commentservice.commentReactionsUser(this.username, 'true').subscribe(commentsOfUser => (this.commentsOfUser = commentsOfUser));

     // this.commentservice.commentReactionsUser(this.username, 'true').subscribe(commentsOfUser => (this.commentsOfUser = commentsOfUser));

    }
      
    if(this.getMenuItem() === 'commentsDisliked')
      this.commentservice.commentReactionsUser(this.username, 'false').subscribe(commentsOfUser => (this.commentsOfUser = commentsOfUser));

      console.log(this.commentsOfUser);
  }

  getMenuItem(): string{
    let menuItem = this.route.snapshot.params.menu;
    if(menuItem === undefined)
      return "commentList";
    return menuItem;
  }

}
