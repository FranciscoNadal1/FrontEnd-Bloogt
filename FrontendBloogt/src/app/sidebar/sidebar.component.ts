import { Component, OnInit } from '@angular/core';
import { PostService } from '../bloogt-rest/services/post.service';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public moreLikedPost: any = {  };
  public news: any = {  };
  constructor(private postservice: PostService) { }

  ngOnInit(): void {
    this.postservice.getMoreLikedPostLastHour("QuickPost").subscribe(moreLikedPost => (this.moreLikedPost = moreLikedPost));
    this.postservice.lastsPostsExceptCategory("QuickPost").subscribe(news => (this.news = news));
  }

}
