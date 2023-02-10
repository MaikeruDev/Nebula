import { Component, OnInit } from '@angular/core';
import { IonInfiniteScroll, InfiniteScrollCustomEvent, ModalController } from '@ionic/angular';
import { ViewerModalComponent } from 'ngx-ionic-image-viewer';
import { PostAdapter } from '../adapter/post-adapter';
import { Post } from '../models/post';
import { User } from '../models/user';
import { ApiService } from '../services/api.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user: User;
  posts: any = [];
  counter_skip: number = 0;  

  constructor(private modalController: ModalController, private userService: UserService, private api: ApiService, private postAdapter: PostAdapter) { }

  ngOnInit() {
    this.userService.getCurrentUser().subscribe(user => {
      this.user = user;
      console.log(this.user);
    });
    this.fetchPosts(0);
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

  async fetchPosts(skip: number){
    this.api.getOwnPosts(skip).subscribe((data: any) => {  
      data.forEach((post: Post) => { 
        this.posts.push(this.postAdapter.adapt(post))
      });   
    }) 
  }

  onIonInfinite(ev: Event) {
    this.counter_skip += 15;
    this.fetchPosts(this.counter_skip);
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

}
