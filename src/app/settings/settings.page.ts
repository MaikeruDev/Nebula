import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  user: any = [];
  newPP: any = "";
  newBanner: any = "";

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
      try{
        this.changeSettingsForm.setValue({username: user?.Username, handle: user?.Handle, bio: user?.Bio});
      }
      catch(err){
        console.log("Everything works fine.");
      }
    });
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
