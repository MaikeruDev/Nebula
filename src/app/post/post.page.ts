import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, InfiniteScrollCustomEvent, ModalController, NavController } from '@ionic/angular';
import { ViewerModalComponent } from 'ngx-ionic-image-viewer';
import { PostAdapter } from '../adapter/post-adapter';
import { UserAdapter } from '../adapter/user-adapter';
import { Post } from '../models/post';
import { User } from '../models/user';
import { ApiService } from '../services/api.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {

  PostID: number;
  counter_skip: number = 0

  post: Post;

  user: any

  constructor(private userService: UserService, private userAdapter: UserAdapter, private modalController: ModalController, private postAdapter: PostAdapter, private api: ApiService, private router: Router, private nav: NavController) {
    if (router.getCurrentNavigation()?.extras.state) { 
      this.PostID = this.router?.getCurrentNavigation()?.extras?.state?.PostID
    }
    else{
      this.nav.back() 
    } 
  }

  async ngOnInit() {
    this.userService.getCurrentUser().subscribe(user => {
      this.user = user; 
    });
    this.api.getPost(this.PostID, 0).subscribe(post => {
      this.post = this.postAdapter.adapt(post);  
      console.log(post)
    })
    //this.loadPost(0)  
  }

  loadPost(skip: number){
    this.api.getPost(this.PostID, skip).subscribe(post => { 
      this.postAdapter.adapt(post).Comments.forEach((comment: Comment) => {
        this.post.Comments.push(comment)
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

  visitUser(user: User){
    this.nav.navigateForward('/user', {
      state: {
        user: user
      }
    })
  }

  like_change(){
    if(this.post.Liked){
      this.post.Liked = false
      this.post.Likes.splice(0, 1)
      this.api.unlikePost(this.post).subscribe()
    } 
    else {
      this.post.Liked = true
      this.post.Likes.push({})
      this.api.likePost(this.post).subscribe()
    }
  }

  async comment(){ 
  }

  onIonInfinite(ev: Event) {
    this.counter_skip += 15;              
    this.loadPost(this.counter_skip);    
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

  back(){
    this.nav.back() 
  }

}