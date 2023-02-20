import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { User } from '../models/user';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  user: User

  notifications: boolean

  constructor(private api: ApiService, private userService: UserService, private auth: AuthService, private nav: NavController, private router: Router) { }

  ionTabsDidChange(event: any){ 
    /* if(event.tab == "notifications")  */this.api.hasNewNotifications().subscribe(res => this.notifications = res)
  }

  ngOnInit() {
    this.userService.getCurrentUser().subscribe(user => {
      this.user = user;
    });

    this.api.hasNewNotifications().subscribe(res => this.notifications = res)
  }

  settings(){
    //this.nav.navigateForward('/settings', {animated: true, animationDirection: 'forward', animation: }) 
    this.router.navigate(['/settings'])
  }

  async logout(){
    this.auth.logout();
  }

}
