import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, NavController } from '@ionic/angular';
import { NotificationAdapter } from '../adapter/notification-adapter';
import { Notification } from '../models/notification';
import { User } from '../models/user';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  constructor(private nav: NavController, private api: ApiService, private notificationAdapter: NotificationAdapter) { }

  notifications: any = []

  no_notifications: boolean = true

  counter_skip: number = 0;

  ngOnInit() {
    this.loadNotifications(0)
  }

  loadNotifications(skip: number){  
    this.api.getNotifications(skip).subscribe(data => {
      data.forEach((notification: Notification) => {
        this.notifications.push(this.notificationAdapter.adapt(notification)) 
      }); 
      this.no_notifications = false
    }) 
  }

  async handleRefresh(event?: any) {  
    this.no_notifications = true;
    this.counter_skip = 0;
    this.notifications = [];
    this.loadNotifications(0)
    if(event) event.target.complete();
  };


  follow_change(index: number){
    if(this.notifications[index].Sender.Self_Following){
      this.notifications[index].Sender.Self_Following = false 
      this.api.unfollow(this.notifications[index].Sender).subscribe()
    } 
    else {
      this.notifications[index].Sender.Self_Following = true 
      this.api.follow(this.notifications[index].Sender).subscribe()
    }
  }

  visitUser(user: User){
    this.nav.navigateForward('/user', {
      state: {
        user: user
      }
    })
  }

  openPost(PostID: number){
    this.nav.navigateForward('/post', {
      state: {
        PostID: PostID
      }
    })
  }

  onIonInfinite(ev: Event) {
    this.counter_skip += 15;              
    this.loadNotifications(this.counter_skip);    
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

}
