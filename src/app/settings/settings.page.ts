import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { ApiService } from '../services/api.service';
import { HomePage } from '../home/home.page';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  providers: [HomePage]
})

export class SettingsPage implements OnInit {
 
  user: any = []; 

  profilePictureImageChangedEvent: string = '';
  bannerImageChangedEvent: string = '';
  croppedImage: string = '';
 
  editPfp: boolean = false;
  editBanner: boolean = false;

  changeSettingsForm: FormGroup;

  constructor(private alert: AlertService, private feed: HomePage, private api: ApiService, private location: Location, private auth: AuthService, private nav: NavController, private userService: UserService) {
    this.changeSettingsForm = new FormGroup({
      username: new FormControl<string | null>('', [Validators.required, Validators.minLength(3)]), 
      handle: new FormControl<string | null>('', [Validators.required, Validators.minLength(3)]),
      bio: new FormControl<string | null>(''),
    });
   }  

   get username() {return this.changeSettingsForm.get('username');} 
   get handle() {return this.changeSettingsForm.get('handle');} 
   get bio() {return this.changeSettingsForm.get('bio');} 
 
  async ngOnInit() {
    await this.userService.getCurrentUser().subscribe(user => {
      this.user = user;
      this.croppedImage = user.ProfilePicture;
      try{
        this.changeSettingsForm.setValue({username: user?.Username, handle: user?.Handle, bio: user?.Bio});
      }
      catch(err){ 
      }
    });
  }

  async cancelSettings(){ 
    this.nav.back(); 
  } 

  editProfilePicture(event: any){ 
    this.editPfp = true   
    this.profilePictureImageChangedEvent = event;
  }

  editBannerPicture(event: any){ 
    this.editBanner = true   
    this.bannerImageChangedEvent = event;
  }

  async cancelCrop(){
    this.profilePictureImageChangedEvent = '';
    this.bannerImageChangedEvent = '';
    this.croppedImage = '';
    this.editPfp = false;
    this.editBanner = false;
  }

  uploadProfilePicture(){
    this.user.ProfilePicture = this.croppedImage
    this.croppedImage = '';
    this.editPfp = false; 
  } 

  uploadBanner(){
    this.user.Banner = this.croppedImage
    this.croppedImage = '';
    this.editBanner = false; 
  } 

  imageCropped(event: any){ 
    this.croppedImage = event.base64;
  } 

  saveSettings(){ 
    if(this.changeSettingsForm.valid)
    this.api.updateProfileSettings({Bio: this.changeSettingsForm.value.bio, Handle: this.changeSettingsForm.value.handle.replaceAll(' ', ''), Username: this.changeSettingsForm.value.username, Banner: this.user.Banner, ProfilePicture: this.user.ProfilePicture}).subscribe(data => {
      
      if(data.status == "Error"){
        this.alert.ok("Error", data.errors)
      }
      else{
        this.nav.back();  
      }
      
    })
  } 

  change_email(){
    this.alert.custom("Not yet lol","OKAY", "", "code-slash-outline", () => { 
    })
  }

  change_password(){
    this.alert.change_password()
  }

  async logout(){
    this.auth.logout();
  }

  async delete_account(){
    this.alert.custom("Not yet lol","OKAY", "", "code-slash-outline", () => { 
    })
  }

}
