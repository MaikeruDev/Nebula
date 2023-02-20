import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InfiniteScrollCustomEvent, ModalController, NavController } from '@ionic/angular';
import { ViewerModalComponent } from 'ngx-ionic-image-viewer';
import { PostAdapter } from '../adapter/post-adapter';
import { UserAdapter } from '../adapter/user-adapter'; 
import { Post } from '../models/post';
import { User } from '../models/user';
import { ApiService } from '../services/api.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  user: User
  visit_user: User

  posts: any = []

  return_page: string;

  counter_skip: number = 0;

  no_posts: boolean = false;
  refreshing: boolean = false;

  constructor(private userService: UserService, private userAdapter: UserAdapter, private postAdapter: PostAdapter, private api: ApiService, public router: Router, private nav: NavController, private modalController: ModalController) {
    if (router.getCurrentNavigation()?.extras.state) { 
      this.visit_user = this.router?.getCurrentNavigation()?.extras?.state?.user,
      this.return_page = this.router?.getCurrentNavigation()?.extras?.state?.page 
    }
    else{
      this.nav.back() 
    }
  }

  ngOnInit() {
    this.userService.getCurrentUser().subscribe(user => {
      this.user = user;
    });
    this.fetchPosts(0)
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

  async fetchPosts(skip: number){
    this.api.getUsersPosts(skip, this.visit_user.ID).subscribe((data: any) => {  
      data.data.forEach((post: Post) => { 
        this.posts.push(this.postAdapter.adapt(post))  
      });   
    }) 
  }

  like_change(post: Post, index: number){
    if(post.Liked){
      this.posts[index].Liked = false
      this.posts[index].Likes.splice(0, 1)
      this.api.unlikePost(post).subscribe()
    } 
    else {
      this.posts[index].Liked = true
      this.posts[index].Likes.push({})
      this.api.likePost(post).subscribe()
    }
  }

  follow_change(){
    if(this.visit_user.Self_Following){
      this.visit_user.Self_Following = false 
      this.api.unfollow(this.visit_user).subscribe()
    } 
    else {
      this.visit_user.Self_Following = true 
      this.api.follow(this.visit_user).subscribe()
    }
  }

  onIonInfinite(ev: Event) {
    this.counter_skip += 15;
    this.fetchPosts(this.counter_skip);
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

  back(){
    this.nav.back();
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

}
