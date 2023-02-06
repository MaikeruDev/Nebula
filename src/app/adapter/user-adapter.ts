import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { User } from '../models/user';
import { Adapter } from './adapter';

@Injectable({
  providedIn: 'root',
})

export class UserAdapter implements Adapter<User> {

  constructor(private domSanitizer: DomSanitizer) { }

  adapt(item: any): User {
    item.SignUpDate = new Date(item.SignUpDate);
    item.ProfilePicture = this.domSanitizer.bypassSecurityTrustResourceUrl(item.ProfilePicture);
    return new User(
      item.ID, item.Email, item.Username, item.Handle, item.ProfilePicture,
      item.Banner, item.SignUpDate);
  }
}