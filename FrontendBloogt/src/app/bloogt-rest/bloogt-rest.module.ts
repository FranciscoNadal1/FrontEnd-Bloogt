import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './component/user-list/user-list.component';
import { PostListComponent } from './component/post-list/post-list.component';
import { CategoryListComponent } from './component/category-list/category-list.component';



@NgModule({
  declarations: [
    UserListComponent,
    PostListComponent,
    CategoryListComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    UserListComponent,
    PostListComponent,
    CategoryListComponent
  ]
})
export class BloogtRestModule { }
