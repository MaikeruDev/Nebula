import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { IonInfiniteScroll, InfiniteScrollCustomEvent, ModalController, NavController } from '@ionic/angular';
import { ViewerModalComponent } from 'ngx-ionic-image-viewer';
import { filter, map, take } from 'rxjs';
import { PostAdapter } from '../adapter/post-adapter';
import { NewPostPage } from '../modal/new-post/new-post.page';
import { Post } from '../models/post';
import { User } from '../models/user';
import { AlertService } from '../services/alert.service';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  
})
export class ProfilePage implements OnInit {

  user: User;

  popover_post: Post;

  posts: any = [];

  counter_skip: number = 0;  

  refreshing: boolean = false
  no_posts: boolean = false
  isOpen: boolean = false;

  day_one = new Date('2023-03-01')
  
  @ViewChild('popover') popover: any; 

  constructor(private authService: AuthService, private alert: AlertService, private router: Router, private nav: NavController, private auth: AuthService, private modalController: ModalController, private userService: UserService, private api: ApiService, private postAdapter: PostAdapter) {
    router.events.forEach((event) => {
      if(event instanceof NavigationStart && event.url == "/tabs/profile") { //If our site gets called again
        this.ionViewDidEnter()                                              //Update Data
      }
    }); 
  }

  ionViewDidEnter() {
    if(this.posts.length < 1){
      return
    }

    var temp_posts: any[] = []
    
    this.api.getOwnPosts(0).subscribe((data: any) => {  
      data.data.forEach((post: Post) => { 
        temp_posts.push(this.postAdapter.adapt(post))  
      });   
      // Update the original array with the updated values
      this.posts = this.posts.map((obj: any, index: any) => {  
        // Compare each property of the object with the corresponding property of the updated object
        // If the property is different, set the new value, otherwise keep the original value
        return { 
          ...obj,
          Comments: obj.Comments === temp_posts[index].Comments ? obj.Comments : temp_posts[index].Comments,
          Likes: obj.Likes === temp_posts[index].Likes ? obj.Likes : temp_posts[index].Likes,
          Liked: obj.Liked === temp_posts[index].Liked ? obj.Liked : temp_posts[index].Liked,
        };
      });
    })  
 
    this.userService.getCurrentUser().subscribe(user => {
      this.user = user;
    });
  }

  presentPopover(e: Event, post: Post) {
    this.popover.event = e;  
    this.popover_post = post;
    this.isOpen = true;
  }

  deletePost(){
    this.isOpen = false;
    this.alert.custom("Are you sure?", "Yes", "No", "trash", () => {
      this.api.deletePost({PostID: this.popover_post.ID}).subscribe(() => {
        this.handleRefresh()
      })
    })
  }

  openPost(event: Event, post: Post){
    const target = event.target as HTMLElement; 
    if (target.tagName.toLowerCase() === 'img' || target.tagName.toLowerCase() === 'ion-button' && !target.className.includes("comment")) {
      return;
    }
    this.nav.navigateForward('/post', {
      state: {
        PostID: post.ID
      }
    })
  }

  openFollowing(){
    this.nav.navigateForward('/following', {
      state: {
        userID: this.user.ID
      }
    })
  }

  openFollowers(){
    this.nav.navigateForward('/followers', {
      state: {
        userID: this.user.ID
      }
    })
  }
  
  trackByFn(index: any, item: any) {
    return item.ID; // return a unique identifier for each item in the array
  }

  ngOnInit() { 
    this.userService.getCurrentUser().subscribe(user => {
      this.user = user; 
    }); 

    this.fetchPosts(0);
  }

  async handleRefresh(event?: any) { 
    this.userService.getCurrentUser().subscribe(user => {
      this.user = user;
    });
    this.refreshing = true;
    this.no_posts = true;
    this.counter_skip = 0;
    this.posts = [];
    this.fetchPosts(0).then(() => {
      if(event) event.target.complete();
    });
  };

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

  onIonInfinite(ev: Event) {
    this.counter_skip += 15;
    this.fetchPosts(this.counter_skip);
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

  async newPost(){
    const modal = await this.modalController.create({
      component: NewPostPage,  
    });

    await modal.present()

    modal.onWillDismiss().then((data) => { 
      setTimeout(() => { 
        this.refreshing = true;
        this.no_posts = true;
        this.counter_skip = 0;
        this.posts = [];
        this.fetchPosts(0)
      }, 500)
    }); 

  }

  async logout(){
    this.auth.logout();
  }
}
