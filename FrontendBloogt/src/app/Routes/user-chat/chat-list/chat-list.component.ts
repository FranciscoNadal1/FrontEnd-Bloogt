import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/bloogt-rest/services/chat.service';
import { UserTokenService } from 'src/app/login/service/user-token.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {

  public userChats: any = {   };
  constructor(private chatservice: ChatService, private userToken : UserTokenService) { }

  ngOnInit(): void {
    
    this.chatservice.getAllChats().subscribe(userChats => (this.userChats = userChats));
    console.log(this.userChats);
    
  }

  getLoggedUser(user: string): boolean{
    if(this.userToken.getLoggedUser() === user){
      return false;
    }
    else{
      return true;
    }
  }

}
