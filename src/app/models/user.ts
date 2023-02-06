import { SafeResourceUrl } from '@angular/platform-browser';

export class User {

  public ID: number;
  public Email: string;
  public Username: string;
  public Handle: string; 
  public ProfilePicture: string;
  public Banner: SafeResourceUrl;
  public Bio: string;
  public Following: number;
  public Followers: number;
  public SignUpDate: Date;

  constructor(
    id: number,
    email: string,
    username: string,
    handle: string,
    profileImage: string,
    banner: SafeResourceUrl,
    bio: string,
    following: number,
    followers: number,
    creationDate: Date
  ) {
    this.ID = id;
    this.Email = email;
    this.Username = username;
    this.Handle = handle;
    this.ProfilePicture = profileImage;
    this.Banner = banner;
    this.Bio = bio;
    this.Following = following,
    this.Followers = followers,
    this.SignUpDate = creationDate; 
  }
}