import { Component } from '@angular/core';
import { SearchService } from 'src/app/bloogt-rest/services/search.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: 'searchBar.component.html',
  styleUrls: ['searchBar.component.css'],
})
export class SearchBarComponent {


  public searchUser: any = {   };
  public searchHashtag: any = {   };
  public contentSize: number;

  public hide: boolean;

  constructor(private searchservice: SearchService) {
    this.hide = true;
  }

  changedContentSearchBar(content: string) {

    this.contentSize = content.length;

    if (content.length < 1)
      return;

      this.hide = false;
    
    this.searchservice.searchUser(content).subscribe(searchUser => (this.searchUser = searchUser));
    this.searchservice.searchHashtag(content).subscribe(searchHashtag => (this.searchHashtag = searchHashtag));
  }

   delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

   async cleanSearchBar(){  
    await this.delay(100);
    this.hide = true;
      
  }

}

function sleep(arg0: number) {
  throw new Error('Function not implemented.');
}
