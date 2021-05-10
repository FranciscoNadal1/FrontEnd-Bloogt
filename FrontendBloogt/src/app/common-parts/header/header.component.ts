import { Component, OnInit } from '@angular/core';
import { UserTokenService} from '../../login/service/user-token.service';
import{ LoginComponent } from '../../login/component/login/login.component';
import { interval, Subscription, timer } from 'rxjs';
import { TokenStorageService } from '../../login/service/token-storage.service';
import Swal from 'sweetalert2';
import { UserService } from '../../bloogt-rest/services/user.service';
import { ChatService } from '../../bloogt-rest/services/chat.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public user: any = {   };
  public username: string;
  public unreadMessages: number = 0;

  constructor(
    public userToken: UserTokenService,
    public tokenService: TokenStorageService,
    private userservice: UserService,
    private chatservice: ChatService) { }

  ngOnInit(): void {

    if(this.tokenService.isTokenDefined){
      this.username = this.userToken.getLoggedUser();
      this.userservice.getUserDetailsByUsername(this.username).subscribe(user => (this.user = user));
      this.chatservice.getUnreadMessages().subscribe(unreadMessages => (this.unreadMessages = unreadMessages));
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
