import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Comment } from '../models/comment';
import { Adapter } from './adapter';

@Injectable({
  providedIn: 'root',
})

export class CommentAdapter implements Adapter<Comment> {

  constructor(private domSanitizer: DomSanitizer) { }

  adapt(item: any): Comment { 
    return new Comment(
      item.ID, item.Text, item.UserID, item.PostID, item.DateCreated, item.users);
  }
}