import { Component, HostListener, OnInit } from '@angular/core';
import { IonInfiniteScroll, InfiniteScrollCustomEvent, ModalController } from '@ionic/angular';
import { ViewerModalComponent } from 'ngx-ionic-image-viewer';
import { PostAdapter } from '../adapter/post-adapter';
import { UserAdapter } from '../adapter/user-adapter';
import { Post } from '../models/post';
import { User } from '../models/user';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  posts: any = [];
  randomUsers: any = [];
  counter_skip: number = 0;
  no_posts: boolean = false;
  refreshOngoing: boolean = false;
  
  constructor(private userAdapter: UserAdapter, private postAdapter: PostAdapter, private api: ApiService, private auth: AuthService, private modalController: ModalController) {}

  onScroll(event: any) { 
    var nav = document.querySelector(".toolbar"); 
    if(event.detail.currentY>0){
      nav?.classList.add("toolbar-shadow");
    }else{
      nav?.classList.remove("toolbar-shadow");
    }
  };
  
  ngOnInit(): void { 
    this.fetchPosts(0);  
    this.getRandomUsers(3);
  } 

  async handleRefresh(event: any) {
    this.no_posts = false;
    this.refreshOngoing = true;
    this.counter_skip = 0;
    this.posts = [];
    this.fetchPosts(0);
    setTimeout(() => {
      this.refreshOngoing = false;
      event.target.complete();
    }, 1500);
  };

  getRandomUsers(amount: number){
    this.api.getRandomUsers(amount).subscribe((data: any) => {
      data.data.forEach((user: User) => { 
        this.randomUsers.push(this.userAdapter.adapt(user))
      });   
    });
  }

  async fetchPosts(skip: number){ 
    this.api.getPosts(skip).subscribe((data: any) => {   //Get Posts from API
      data.data.forEach((post: Post) => { 
        this.posts.push(this.postAdapter.adapt(post))
      });   
      if (this.posts.length == 0) this.no_posts = true //If User has no posts, show suggestions
      else this.no_posts = false
    }) 
  }

  async openViewer(src: any) {
    const modal = await this.modalController.create({
      component: ViewerModalComponent,
      componentProps: {
        src: src
      },
      cssClass: 'ion-img-viewer',
      keyboardClose: true,
      showBackdrop: true,
      swipeToClose: true
    });

    return await modal.present();
  }

  onIonInfinite(ev: Event) {
    this.counter_skip += 15;
    this.fetchPosts(this.counter_skip);
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

}
