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
    followers: number
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
  }
}