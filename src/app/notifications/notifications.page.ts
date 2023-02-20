import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NotificationAdapter } from '../adapter/notification-adapter';
import { Notification } from '../models/notification';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  constructor(private nav: NavController, private api: ApiService, private notificationAdapter: NotificationAdapter) { }

  notifications: any = []

  ngOnInit() {
    this.api.getNotifications().subscribe(data => {
      data.forEach((notification: Notification) => {
        this.notifications.push(this.notificationAdapter.adapt(notification))
      }); 
    })
  }

  openPost(PostID: number){
    this.nav.navigateForward('/post', {
      state: {
        PostID: PostID
      }
    })
  }

}
