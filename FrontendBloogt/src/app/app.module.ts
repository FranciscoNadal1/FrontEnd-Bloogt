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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { OnChanges } from '@angular/core';
import { TimeAgo } from './customPipes/timeAgo.pipe';


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
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    PostDetailsComponent,
    PostListComponent,
    UserDetailsComponent,
    CutHtmlText,
    TimeAgo
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    LoginRoutingModule,
    HttpClientModule,
    BloogtRestModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NotifierModule.withConfig(customNotifierOptions)
  ],
  providers: [],
  bootstrap: [AppComponent, HeaderComponent, FooterComponent, SidebarComponent]
})
export class AppModule { 

  
}
