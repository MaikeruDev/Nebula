import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  user: any = [];
  newPP: any = "";
  newBanner: any = "";
  resizedBanner: any = "";
  resizedPP: any = "";

  changeSettingsForm: FormGroup;

  constructor(private location: Location, private auth: AuthService, private nav: NavController, private userService: UserService) {
    this.changeSettingsForm = new FormGroup({
      username: new FormControl<string | null>('', [Validators.required, Validators.minLength(3)]), 
      handle: new FormControl<string | null>('', [Validators.required, Validators.minLength(3)]),
      bio: new FormControl<string | null>(''),
    });
   }

   get username() {return this.changeSettingsForm.get('username');} 
   get handle() {return this.changeSettingsForm.get('handle');} 
   get bio() {return this.changeSettingsForm.get('bio');} 

   

   login_confirm() {  
    if (this.changeSettingsForm.valid) { 
      console.log("pensi");
    }
  } 

  async ngOnInit() {
    await this.userService.getCurrentUser().subscribe(user => {
      this.user = user;
      this.resizedPP = user.ProfilePicture;
      try{
        this.changeSettingsForm.setValue({username: user?.Username, handle: user?.Handle, bio: user?.Bio});
      }
      catch(err){
        console.log("Everything works fine.");
      }
    });
  }

  pfpChangeEvent(ev: any){
    const file = ev.target.files[0];
    const reader = new FileReader();
    var width;
    var height;
    reader.readAsDataURL(file);
    reader.onload = () => {
      var newPP = new Image();
      newPP.src = reader.result as string;
      this.newPP = reader.result;
      newPP.onload = async() => {
        this.compressImage(this.newPP, 512, 512).then(compressed => {
          this.resizedPP = compressed;
        })
      }
    };
  }

  async compressImage(src: any, newX: any, newY: any) {
    return new Promise((res, rej) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        const elem = document.createElement('canvas');
        elem.width = newX;
        elem.height = newY;
        const ctx = elem.getContext('2d');
        ctx?.drawImage(img, 0, 0, newX, newY);
        const data = ctx?.canvas.toDataURL();
        res(data);
      }
      img.onerror = error => rej(error);
    })
  }

  cancelSettings(){ 
    this.nav.back();
  }

  checkSettings(){ 

  }


  async logout(){
    this.auth.logout();
  }

}
