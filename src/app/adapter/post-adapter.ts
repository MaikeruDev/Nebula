import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Post } from '../models/post';
import { Adapter } from './adapter';
import { CommentAdapter } from './comment-adapter';
import { UserAdapter } from './user-adapter';

@Injectable({
  providedIn: 'root',
})

export class PostAdapter implements Adapter<Post> {

  constructor(private domSanitizer: DomSanitizer, private userAdapter: UserAdapter, private commentAdapter: CommentAdapter) { }

  adapt(item: any): Post {  
    item.DateCreated = new Date(item.DateCreated);  
    return new Post(
      item.ID, item.AuthorID, item.DateCreated, item.Image, item.Text, item.users, item.likes, item.comments, item.liked, item.len, this.userAdapter, this.commentAdapter);
  }
}