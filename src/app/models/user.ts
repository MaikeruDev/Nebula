import { SafeResourceUrl } from '@angular/platform-browser';

export class User {

  public ID: number;
  public Email: string;
  public Username: string;
  public Handle: string; 
  public ProfilePicture: SafeResourceUrl;
  public Banner: SafeResourceUrl;
  public SignUpDate: Date;

  constructor(
    id: number,
    email: string,
    username: string,
    handle: string,
    profileImage: SafeResourceUrl,
    banner: SafeResourceUrl,
    creationDate: Date
  ) {
    this.ID = id;
    this.Email = email;
    this.Username = username;
    this.Handle = handle;
    this.ProfilePicture = profileImage;
    this.Banner = banner;
    this.SignUpDate = creationDate; 
  }
}