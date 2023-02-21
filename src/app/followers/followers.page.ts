import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InfiniteScrollCustomEvent, NavController } from '@ionic/angular';
import { NotificationAdapter } from '../adapter/notification-adapter';
import { UserAdapter } from '../adapter/user-adapter';
import { User } from '../models/user';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'Nebula-followers',
  templateUrl: './followers.page.html',
  styleUrls: ['./followers.page.scss'],
})
export class FollowersPage implements OnInit {

  counter_skip: number = 0

  no_followers: boolean = true

  followers: any = []

  visit_user: User;

  constructor(private userAdapter: UserAdapter, private nav: NavController, private api: ApiService, private router: Router) {
    if (router.getCurrentNavigation()?.extras.state) { 
      this.visit_user = this.router?.getCurrentNavigation()?.extras?.state?.userID
    }
    else{
      this.nav.back() 
    }
  }

  ngOnInit() {
    this.loadFollowers(0)
  }

  visitUser(user: User){
    this.nav.navigateForward('/user', {
      state: {
        user: this.userAdapter.adapt(user)
      }
    })
  }

  loadFollowers(skip: number){ 
    this.api.getFollowers(skip, this.visit_user).subscribe(data => {
      data.forEach((follower: any) => {
        var temp = follower.users_relationships_FollowerIDTousers 
        temp.Date = follower.DateCreated 
        this.followers.push(temp) 
      }); 
      this.no_followers = false
    })
  }

  async handleRefresh(event?: any) {  
    this.no_followers = true;
    this.counter_skip = 0;
    this.followers = [];
    this.loadFollowers(0)
    if(event) event.target.complete();
  };

  onIonInfinite(ev: Event) {
    this.counter_skip += 15;              
    this.loadFollowers(this.counter_skip);    
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

  back(){
    this.nav.back()
  }

}
