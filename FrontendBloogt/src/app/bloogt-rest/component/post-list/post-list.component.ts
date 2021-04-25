import { Component, OnInit } from '@angular/core';
import { PostService } from "../../services/post.service";


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  public post: any = { 
    
  };

  constructor(private postservice : PostService) { }

  
  ngOnInit() {
    this.postservice.getAllPosts().subscribe(post => (this.post = post));
  }

}
