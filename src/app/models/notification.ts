import { Optional } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { UserAdapter } from '../adapter/user-adapter';
import { User } from './user';

export class Notification {

  public ID: number;
  public Type: string;
  public Sender: User; 
  public Seen: boolean; 
  public DateCreated: Date;
  public PostID: number; 
  public Message: string;

  constructor(
    id: number,
    type: string,
    sender: User,
    seen: boolean,
    dateCreated: Date,
    postID: number,
    message: string,
    private userAdapter: UserAdapter
  ) {
    this.ID = id;
    this.Type = type;
    this.Sender = this.userAdapter.adapt(sender);
    this.Seen = seen;
    this.DateCreated = dateCreated;
    this.PostID = postID; 
    this.Message = message;
  }
}