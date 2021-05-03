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
    
    this.username = this.route.snapshot.params.username;
    this.commentservice.getAllCommentsOfUsername(this.username).subscribe(commentsOfUser => (this.commentsOfUser = commentsOfUser));
    console.log("---------------------------")
    console.log(this.commentsOfUser)
    console.log("---------------------------")
  }

}
