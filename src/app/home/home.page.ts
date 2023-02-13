import { Component, HostListener, OnInit } from '@angular/core';
import { IonInfiniteScroll, InfiniteScrollCustomEvent, ModalController } from '@ionic/angular';
import { ViewerModalComponent } from 'ngx-ionic-image-viewer';
import { PostAdapter } from '../adapter/post-adapter';
import { UserAdapter } from '../adapter/user-adapter';
import { NewPostPageModule } from '../modal/new-post/new-post.module';
import { NewPostPage } from '../modal/new-post/new-post.page';
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
  refreshing: boolean = false;
  
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

  async newPost(){
    const modal = await this.modalController.create({
      component: NewPostPage,  
    });

    await modal.present().then(() => {
      this.handleRefresh()
    });
  }

  async handleRefresh(event?: any) {
    this.refreshing = true;
    this.no_posts = true;
    this.counter_skip = 0;
    this.posts = [];
    this.fetchPosts(0).then(() => {
      if(event) event.target.complete();        //Stop the loading animation when the reload is done 
    });
  };

  getRandomUsers(amount: number){
    this.api.getRandomUsers(amount).subscribe((data: any) => {  //Get random Users from API
      data.data.forEach((user: User) => { 
        this.randomUsers.push(this.userAdapter.adapt(user))
      });   
    });
  }

  async fetchPosts(skip: number){ 
    this.api.getPosts(skip).subscribe(async (data: any) => {   //Get Posts from API
      data.data.forEach((post: Post) => { 
        this.posts.push(this.postAdapter.adapt(post))
      });    
      if (this.posts.length == 0) this.no_posts = true //If User has no posts, show suggestions
      else {
        this.no_posts = false
      } 
      this.refreshing = false;
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
    this.counter_skip += 15;              //Every time the user reaches the last loaded post, the API
    this.fetchPosts(this.counter_skip);   //will look for more posts to load
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

}
