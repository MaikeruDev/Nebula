import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Post } from '../models/post';
import { Adapter } from './adapter';

@Injectable({
  providedIn: 'root',
})

export class PostAdapter implements Adapter<Post> {

  constructor(private domSanitizer: DomSanitizer) { }

  adapt(item: any): Post {  
    return new Post(
      item.ID, item.AuthorID, item.DateCreated, item.Image, item.Text, item.users, item.likes, item.comments);
  }
}