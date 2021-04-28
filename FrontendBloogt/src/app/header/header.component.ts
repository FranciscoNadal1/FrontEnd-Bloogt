import { Component, OnInit } from '@angular/core';
import { UserTokenService} from '../login/service/user-token.service';
import{ LoginComponent } from '../login/component/login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  constructor(public userToken: UserTokenService) { }

  ngOnInit(): void {

  }

  goToLogin(){
   window.location.href="/login";
  }

  logout(){
    this.userToken.logoutUser();
  }
}
