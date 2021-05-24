import { Component, OnInit } from '@angular/core';
import { UserTokenService} from '../../login/service/user-token.service';
import{ LoginComponent } from '../../login/component/login/login.component';
import { interval, Subscription, timer } from 'rxjs';
import { TokenStorageService } from '../../login/service/token-storage.service';
import Swal from 'sweetalert2';
import { UserService } from '../../bloogt-rest/services/user.service';
import { ChatService } from '../../bloogt-rest/services/chat.service';
import { NotificationService } from 'src/app/bloogt-rest/services/notification.service';
import { switchMap } from 'rxjs/internal/operators/switchMap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  
  subscription: Subscription;
  public user: any = {   };
  public username: string;
  public unreadMessages: number = 0;
  public unreadNotifications: number = 0;

  constructor(
    public userToken: UserTokenService,
    public tokenService: TokenStorageService,
    private userservice: UserService,
    private chatservice: ChatService,
    private notificationservice: NotificationService) { }

  ngOnInit(): void {

    if(this.tokenService.isTokenDefined){
      this.username = this.userToken.getLoggedUser();
      this.userservice.getUserDetailsByUsername(this.username).subscribe(user => (this.user = user));



      this.subscription = timer(0, 10000).pipe(
        switchMap(() => this.chatservice.getUnreadMessages())
      ).subscribe(unreadMessages => this.unreadMessages = unreadMessages);

      this.subscription = timer(0, 10000).pipe(
        switchMap(() => this.notificationservice.getUnreadNotifications())
      ).subscribe(unreadNotifications => this.unreadNotifications = unreadNotifications);


/*
      this.chatservice.getUnreadMessages().subscribe(unreadMessages => (this.unreadMessages = unreadMessages));
      this.notificationservice.getUnreadNotifications().subscribe(unreadNotifications => (this.unreadNotifications = unreadNotifications));
      */
    }

    const reloadInterval = 10000;
    setInterval(()=> {
      if(this.tokenService.isTokenDefined() === true){
      if(this.tokenService.isTokenExpired() === true){
        this.userToken.logoutUser();
      }
    }
  }, reloadInterval);
  }

  goToLogin(){
   window.location.href="/login";
  }

  logout(){
    this.userToken.logoutUser();
  }
}
