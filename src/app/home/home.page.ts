import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  posts: any;
  
  constructor(private api: ApiService, private auth: AuthService) {}

  async logout(){
    this.auth.logout()
  }

  async load(){
    this.api.getPosts().subscribe((data: any) => { 
      this.posts = data
    })
  }

}
