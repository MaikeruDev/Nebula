import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  posts: any;
  
  constructor(private api: ApiService) {}

  async login(){

  }

  async auth(){
    this.api.getPosts().subscribe((data: any) => {
      console.log(data)
      this.posts = data
    })
  }

}
