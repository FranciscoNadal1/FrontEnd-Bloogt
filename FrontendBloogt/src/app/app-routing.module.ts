import { NgModule, OnChanges } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PostDetailsComponent } from './Routes/post-details/post-details.component';
import { PostListComponent } from './Routes/post-list/post-list.component';
import { ChatListComponent } from './Routes/user-chat/chat-list/chat-list.component';
import { UserDetailsComponent } from './Routes/user-details/user-details.component';

const routes: Routes = [
  { path: '', component: PostListComponent },
  { path: 'post/:id', component: PostDetailsComponent },
  { path: 'post', component: PostListComponent },
  { path: 'user/:username', component: UserDetailsComponent },
  { path: 'user/:username/:menu', component: UserDetailsComponent },
  { path: 'chat', component: ChatListComponent },
  { path: 'chat/:id', component: ChatListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule   { 


}
