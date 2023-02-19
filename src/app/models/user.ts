import { Optional } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';

export class User {

  public ID: number;
  public Email: string;
  public Username: string;
  public Handle: string; 
  public ProfilePicture: string;
  public Banner: SafeResourceUrl;
  public Bio: string;
  public SignUpDate: Date;
  public Following: number;
  public Followers: number;
  public Self_Following: boolean;

  constructor(
    id: number,
    email: string,
    username: string,
    handle: string,
    profileImage: string,
    banner: SafeResourceUrl,
    bio: string,
    creationDate: Date,
    following: number,
    followers: number,
    self_following: boolean,
  ) {
    this.ID = id;
    this.Email = email;
    this.Username = username;
    this.Handle = handle;
    this.ProfilePicture = profileImage;
    this.Banner = banner;
    this.Bio = bio;
    this.SignUpDate = creationDate; 
    this.Following = following;
    this.Followers = followers;
    this.Self_Following = self_following;
  }
}