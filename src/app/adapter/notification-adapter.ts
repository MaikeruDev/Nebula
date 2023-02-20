import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Notification } from '../models/notification';
import { Adapter } from './adapter';
import { UserAdapter } from './user-adapter';

@Injectable({
  providedIn: 'root',
})

export class NotificationAdapter implements Adapter<Notification> {

  constructor(private domSanitizer: DomSanitizer, private userAdapter: UserAdapter) { }
    
  adapt(item: any): Notification {  
    return new Notification(
      item.ID, item.Type, item.users_notifications_SenderIDTousers, item.seen, item.DateCreated, item.PostID, item.message, this.userAdapter);
  }
}