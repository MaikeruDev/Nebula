import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(private location: Location, private auth: AuthService, private nav: NavController) { }

  ngOnInit() {
  }

  cancelSettings(){ 
    this.nav.back()
  }

  async logout(){
    this.auth.logout();
  }

}
