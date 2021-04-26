import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PostService } from "../../bloogt-rest/services/post.service";
import { CommentsService } from "../../bloogt-rest/services/comments.service";

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {
  public post: any = {   };
  public comments: any = {   };
  public id: number;

  constructor(private route: ActivatedRoute, 
    private postservice : PostService,    
    private commentservice : CommentsService
    
    ) { }

  ngOnInit() {
    
    let id = this.route.snapshot.params.id;
    this.postservice.getPostById(id).subscribe(post => (this.post = post));
    this.commentservice.getCommentsById(id).subscribe(comments => (this.comments = comments));
  }
}
