import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription, timer } from 'rxjs';
import { share, switchMap } from 'rxjs/operators';
import { ChatService } from 'src/app/bloogt-rest/services/chat.service';
import { UserTokenService } from 'src/app/login/service/user-token.service';
import {ChangeDetectorRef} from '@angular/core';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription();
  public userChats: any = {};

  newMessage: FormGroup;
  public actualChat: any = {};
  public actualChatId;
  constructor(
    private route: ActivatedRoute,
    private chatservice: ChatService,
    private readonly formBuilder: FormBuilder,
    private userToken: UserTokenService,
    private cd: ChangeDetectorRef) {
    this.newMessage = this.formBuilder.group({
      message: ['']
    });
  }

  refreshData() {
    
    this.subscription.add(this.chatservice.getAllChats().subscribe(userChats => (this.userChats = userChats)));
    this.actualChat = null;
    this.subscription.add(this.chatservice.getChatById(this.actualChatId).subscribe(actualChat => (this.actualChat = actualChat)));
    //this.ngOnInit();
    this.cd.detectChanges();
    }

  ngOnInit(): void {
    
    this.actualChatId = this.route.snapshot.params.id;
    console.log(this.actualChatId)
    this.subscription.add(this.chatservice.getAllChats().subscribe(userChats => (this.userChats = userChats)));
    this.getChatDetails();
  }
  

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  newMessageChat() {
    this.chatservice.sendMessageToChat(this.newMessage.value.message, this.actualChatId).subscribe();
    this.newMessage = this.formBuilder.group({
      message: ['']
    });
    this.subscription.add(this.chatservice.getChatById(this.actualChatId).subscribe(actualChat => (this.actualChat = actualChat)));
    this.refreshData();

  }
  getLoggedUser(user: string): boolean {
    if (this.userToken.getLoggedUser() === user) {
      return true;
    }
    else {
      return false;
    }
  }

  changeActualChat(id) {
    this.actualChatId = id;
    this.getChatDetails();
  }

  getChatDetails() {

    this.subscription.add(this.chatservice.getChatById(this.actualChatId).subscribe(actualChat => (this.actualChat = actualChat)));
  }

  isUnread(json) : boolean{

    let name = this.userToken.getLoggedUser();

    if(json[name] > 0)
      return true;
    return false;

  }

  shouldBeTogether(date1: string, date2: string, user1: string, user2: string): boolean {
    if (user1 !== user2)
      return true;
    return false;
  }

}
