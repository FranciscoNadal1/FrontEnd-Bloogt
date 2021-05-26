import { Component } from '@angular/core';
import { SearchService } from 'src/app/bloogt-rest/services/search.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: 'searchBar.component.html',
  styleUrls: ['searchBar.component.css'],
})
export class SearchBarComponent {


  public searchUser: any = {   };

  constructor(private searchservice: SearchService) {

  }

  changedContentSearchBar(content: string) {

    if (content.length < 1)
      return;

    
    this.searchservice.searchUser(content).subscribe(searchUser => (this.searchUser = searchUser));
  }


  cleanSearchBar(){
    
      this.searchUser =  {   };
  }

}