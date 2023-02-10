import { Component, OnInit } from '@angular/core';
import { IonInfiniteScroll, InfiniteScrollCustomEvent, ModalController } from '@ionic/angular';
import { ViewerModalComponent } from 'ngx-ionic-image-viewer';
import { PostAdapter } from '../adapter/post-adapter';
import { Post } from '../models/post';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  posts: any = [];
  counter_skip: number = 0;
  
  constructor(private postAdapter: PostAdapter, private api: ApiService, private auth: AuthService, private modalController: ModalController) {}

  ngOnInit(): void {
    this.fetchPosts(0); 
  } 

  async logout(){
    this.auth.logout();
  }

  async fetchPosts(skip: number){
    this.api.getPosts(skip).subscribe((data: any) => {  
      data.forEach((post: Post) => { 
        this.posts.push(this.postAdapter.adapt(post))
      });   
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
