import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BloogtRestModule } from './bloogt-rest/bloogt-rest.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './common-parts/header/header.component';
import { FooterComponent } from './common-parts/footer/footer.component';
import { SidebarComponent } from './common-parts/sidebar/sidebar.component';
import { PostDetailsComponent } from './Routes/post-details/post-details.component';
import { PostListComponent } from './Routes/post-list/post-list.component';
import { UserDetailsComponent } from './Routes/user-details/user-details.component';

import { CutHtmlText } from './common-parts/customPipes/cutHtmlText.pipe';
import { LoginRoutingModule } from './login/login-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { OnChanges } from '@angular/core';
import { TimeAgo } from './common-parts/customPipes/timeAgo.pipe';
import { PostUserListComponent } from './Routes/user-details/post-user-list/post-user-list.component';
import { CommentUserListComponent } from './Routes/user-details/comment-user-list/comment-user-list.component';
import { FollowersComponent } from './Routes/user-details/Follow/followers/followers.component';
import { FollowingComponent } from './Routes/user-details/Follow/following/following.component';
import { ChatListComponent } from './Routes/user-chat/chat-list/chat-list.component';
import { LeftBarComponent } from './common-parts/left-bar/left-bar.component';
import { HashtagLinkification } from './common-parts/customPipes/hashtagLinkification.pipe';
import { CommonPartsModule } from './common-parts/common-parts.module';
import { PostBarComponent } from './common-parts/post-bar/post-bar.component';
import { TextareaAutosizeModule } from 'ngx-textarea-autosize';
import { MatNativeDateModule } from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';

const customNotifierOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: 'left',
      distance: 12
    },
    vertical: {
      position: 'bottom',
      distance: 12,
      gap: 10
    }
  },
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};

@NgModule({
  declarations: [
    AppComponent,
    PostDetailsComponent,
    PostListComponent,
    UserDetailsComponent,
    PostUserListComponent,
    CommentUserListComponent,
    FollowersComponent,
    FollowingComponent,
    ChatListComponent
  ],
  imports: [
    TextareaAutosizeModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    LoginRoutingModule,
    HttpClientModule,
    BloogtRestModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CommonPartsModule,
    NotifierModule.withConfig(customNotifierOptions)
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent, HeaderComponent, FooterComponent, SidebarComponent, LeftBarComponent, PostBarComponent]
})
export class AppModule { }
