import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { timer } from 'rxjs/internal/observable/timer';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { Subscription } from 'rxjs/internal/Subscription';
import { UserService } from 'src/app/bloogt-rest/services/user.service';


@Component({
  selector: 'app-header-user-details',
  templateUrl: './header-user-details.component.html',
  styleUrls: ['./header-user-details.component.css']
})
export class HeaderUserDetailsComponent implements OnInit {

  @Input()
  username: string;

  subscription: Subscription;
  //public username: string;
  public userStatistics: any;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router) {     

      router.events.subscribe((val) => {        
      try {
        this.ngOnInit();
      } finally {        
      }
    });}

  ngOnInit(): void {
    
    this.subscription = null;
    

    this.subscription = timer(0, 20000).pipe(
      switchMap(() => this.userService.getUserStatistics(this.username))
    ).subscribe(userStatistics => this.userStatistics = userStatistics);




  }


}
