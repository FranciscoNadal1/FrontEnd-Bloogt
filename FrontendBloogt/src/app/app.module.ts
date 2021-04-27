import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BloogtRestModule } from './bloogt-rest/bloogt-rest.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PostDetailsComponent } from './Routes/post-details/post-details.component';
import { PostListComponent } from './Routes/post-list/post-list.component';
import { UserDetailsComponent } from './Routes/user-details/user-details.component';
import { CutHtmlText } from './customPipes/cutHtmlText.pipe';
import { LoginRoutingModule } from './login/login-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    PostDetailsComponent,
    PostListComponent,
    UserDetailsComponent,
    CutHtmlText
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    LoginRoutingModule,
    HttpClientModule,
    BloogtRestModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent, HeaderComponent, FooterComponent, SidebarComponent]
})
export class AppModule { }
