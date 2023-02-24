import { SafeResourceUrl } from '@angular/platform-browser';
import { CommentAdapter } from '../adapter/comment-adapter';
import { UserAdapter } from '../adapter/user-adapter';
import { Comment } from './comment';
import { User } from './user';

export class Post {

  public ID: number;
  public AuthorID: number;
  public DateCreated: Date;
  public Image: string;
  public Image_Loaded: boolean;
  public Text: string;  
  public User: User;
  public Likes: any[];
  public Comments: any;
  public Liked: boolean;
  public CommentCount: number;

  constructor(
    ID: number,
    AuthorID: number,
    DateCreated: Date,
    Image: string,
    Image_Loaded: boolean,
    Text: string, 
    User: User,
    Likes: any[],
    Comments: any,
    liked: boolean,
    commentsCount: number,
    private userAdapter: UserAdapter,
    private commentAdapter: CommentAdapter
  ) {
    this.ID = ID;
    this.AuthorID = AuthorID;
    this.DateCreated = DateCreated;
    this.Image = Image;
    this.Image_Loaded = Image_Loaded;
    this.Text = Text;
    this.User = this.userAdapter.adapt(User);
    this.Likes = Likes;
    this.Comments = []
    Comments.forEach((comment: Comment) => {
      this.Comments.push(this.commentAdapter.adapt(comment));
    });
    this.Liked = liked;
    this.CommentCount = commentsCount;
  }
}