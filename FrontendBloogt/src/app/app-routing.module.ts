import { NgModule, OnChanges } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PostBarComponent } from './common-parts/post-bar/post-bar.component';
import { PostDetailsComponent } from './Routes/post-details/post-details.component';
import { PostListComponent } from './Routes/post-list/post-list.component';
import { ChatListComponent } from './Routes/user-chat/chat-list/chat-list.component';
import { UserDetailsComponent } from './Routes/user-details/user-details.component';
import { NotificationListComponent } from './Routes/user-notifications/notifications.component';

const routes: Routes = [
  { path: 'post/:id', component: PostDetailsComponent },
  { path: 'user/:username/:menu', component: UserDetailsComponent },
  { path: 'user/:username', component: UserDetailsComponent },
  { path: 'chat/:id', component: ChatListComponent },
  { path: 'post', component: PostListComponent },
  { path: 'hashtag/:hashtagName', component: PostListComponent },
  { path: 'chat', component: ChatListComponent },
  { path: 'notifications', component: NotificationListComponent },
  { path: '', component: PostListComponent, pathMatch: 'full'  },
];

@NgModule(
  {
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule   { }
