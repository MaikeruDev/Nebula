import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(private location: Location, private auth: AuthService) { }

  ngOnInit() {
  }

  cancelSettings(){
    this.location.back();
  }

  async logout(){
    this.auth.logout();
  }

}
