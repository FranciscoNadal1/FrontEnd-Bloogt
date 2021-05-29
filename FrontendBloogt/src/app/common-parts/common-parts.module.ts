import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostBarComponent } from './post-bar/post-bar.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LeftBarComponent } from './left-bar/left-bar.component';
import { CutHtmlText } from './customPipes/cutHtmlText.pipe';
import { HashtagLinkification } from './customPipes/hashtagLinkification.pipe';
import { TimeAgo } from './customPipes/timeAgo.pipe';
import { AppRoutingModule } from '../app-routing.module';
import { LoginComponent } from '../login/component/login/login.component';
import { LoginRoutingModule } from '../login/login-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DemoMaterialModule } from '../material.module';
import { SearchBarComponent } from './header/SearchBar/searchBar.component';
import { CommonPostListComponent } from './post-list/common-post-list.component';

@NgModule({
  declarations: [
    SearchBarComponent,
    CommonPostListComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    PostBarComponent,
    LeftBarComponent,
    CutHtmlText,
    HashtagLinkification,
    TimeAgo
  ],
  imports: [
    DemoMaterialModule,
    LoginRoutingModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    DemoMaterialModule,
    PostBarComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    LeftBarComponent,
    CutHtmlText,
    CommonPostListComponent,
    HashtagLinkification,
    TimeAgo
  ],
  providers: [],
  bootstrap: [ FooterComponent,  SidebarComponent, HeaderComponent, PostBarComponent, LeftBarComponent, SearchBarComponent]
})
export class CommonPartsModule { }
