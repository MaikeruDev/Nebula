import { SafeResourceUrl } from '@angular/platform-browser'; 
import { UserAdapter } from '../adapter/user-adapter';
import { User } from './user';

export class Comment {

  public ID: number;
  public Text: string;
  public UserID: number;
  public PostID: number;
  public DateCreated: Date;
  public User: User;

  constructor(
    ID: number,
    Text: string,
    UserID: number,
    PostID: number,
    DateCreated: Date,
    User: User,
    private userAdapter: UserAdapter
  ) {
    this.ID = ID;
    this.Text = Text;
    this.UserID = UserID;
    this.PostID = PostID;
    this.DateCreated = DateCreated;
    this.User = this.userAdapter.adapt(User);
  }
}