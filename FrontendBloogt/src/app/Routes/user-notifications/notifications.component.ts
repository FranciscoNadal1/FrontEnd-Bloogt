import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription, timer } from 'rxjs';
import { share, switchMap } from 'rxjs/operators';
import { ChatService } from 'src/app/bloogt-rest/services/chat.service';
import { UserTokenService } from 'src/app/login/service/user-token.service';
import {ChangeDetectorRef} from '@angular/core';
import { NotificationService } from 'src/app/bloogt-rest/services/notification.service';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notifications.html',
  styleUrls: ['./notifications.css']
})
export class NotificationListComponent implements OnInit {

  public userNotifications: any = {};

  newMessage: FormGroup;
  public actualChat: any = {};
  public actualChatId;
  constructor(
    private route: ActivatedRoute,
    private chatservice: ChatService,
    private notificationService: NotificationService,
    private readonly formBuilder: FormBuilder,
    private userToken: UserTokenService,
    private cd: ChangeDetectorRef) {

  }


  ngOnInit(): void {

   this.notificationService.getSelfNotifications().subscribe(userNotifications => (this.userNotifications = userNotifications));
  }


}
