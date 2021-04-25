import { Component, OnInit } from '@angular/core';

import { CategoryService } from "../../services/category.service";

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  public category: any = { 
    
  };

  constructor(private categoryservice : CategoryService) { }

  
  ngOnInit() {
    this.categoryservice.getAllCategories().subscribe(post => (this.category = post));
  }

}
