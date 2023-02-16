import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  user: any = [];

  constructor(private location: Location, private auth: AuthService, private nav: NavController, private userService: UserService) { }

  ngOnInit() {
    this.userService.getCurrentUser().subscribe(user => {
      this.user = user;
    });
  }

  cancelSettings(){ 
    this.nav.back()
  }

  async logout(){
    this.auth.logout();
  }

}
