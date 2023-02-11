import { SafeResourceUrl } from '@angular/platform-browser';
import { Comment } from './comment';
import { User } from './user';

export class Post {

  public ID: number;
  public AuthorID: number;
  public DateCreated: Date;
  public Image: string;
  public Text: string;  
  public User: User;
  public Likes: Object;
  public Comments: Comment;

  constructor(
    ID: number,
    AuthorID: number,
    DateCreated: Date,
    Image: string,
    Text: string, 
    User: User,
    Likes: Object,
    Comments: Comment
  ) {
    this.ID = ID;
    this.AuthorID = AuthorID;
    this.DateCreated = DateCreated;
    this.Image = Image;
    this.Text = Text;
    this.User = User;
    this.Likes = Likes
    this.Comments = Comments
  }
}