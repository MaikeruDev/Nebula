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
    return new User(
      item.ID, item.Email, item.Username, item.Handle, item.ProfilePicture,
      item.Banner, item.Bio,
      item.SignUpDate, item?.relationships_relationships_FollowerIDTousers?.length, item?.relationships_relationships_FollowedIDTousers?.length, item?.Following
    );
  }
}