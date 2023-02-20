import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Comment } from '../models/comment';
import { Adapter } from './adapter';
import { UserAdapter } from './user-adapter';

@Injectable({
  providedIn: 'root',
})

export class CommentAdapter implements Adapter<Comment> {

  constructor(private domSanitizer: DomSanitizer, private userAdapter: UserAdapter) { }

  adapt(item: any): Comment {
    item.DateCreated = new Date(item.DateCreated);  
    return new Comment(
      item.ID, item.Text, item.UserID, item.PostID, item.DateCreated, item.users, this.userAdapter);
  }
}