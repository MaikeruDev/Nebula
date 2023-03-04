import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { AlertController, InfiniteScrollCustomEvent, ModalController, NavController } from '@ionic/angular';
import { ViewerModalComponent } from 'ngx-ionic-image-viewer';
import { PostAdapter } from '../adapter/post-adapter';
import { UserAdapter } from '../adapter/user-adapter'; 
import { Post } from '../models/post';
import { User } from '../models/user';
import { AlertService } from '../services/alert.service';
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
  day_one = new Date('2023-04-01')

  no_posts: boolean = false;
  refreshing: boolean = false;

  constructor(private alert: AlertService, private userService: UserService, private userAdapter: UserAdapter, private postAdapter: PostAdapter, private api: ApiService, public router: Router, private nav: NavController, private modalController: ModalController) {
    if (router.getCurrentNavigation()?.extras.state) { 
      this.visit_user = this.router?.getCurrentNavigation()?.extras?.state?.user,
      this.return_page = this.router?.getCurrentNavigation()?.extras?.state?.page 
    }
    else{
      this.nav.back() 
    }
    router.events.forEach((event) => {
      if(event instanceof NavigationStart && event.url == "/user") {      //If our site gets called again
        this.ionViewDidEnter()                                            //Update Data
      }
    }); 
  }

  ionViewDidEnter() {
    if(this.posts.length < 1){
      return
    }

    var temp_posts: any[] = []
    
    this.api.getUsersPosts(0, this.visit_user.ID).subscribe((data: any) => {  
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

  ngOnInit() {
    this.userService.getCurrentUser().subscribe(user => {
      this.user = user;
    });
    this.fetchPosts(0)
  }

  openFollowing(){
    this.nav.navigateForward('/following', {
      state: {
        userID: this.visit_user.ID
      }
    })
  }

  openFollowers(){
    this.nav.navigateForward('/followers', {
      state: {
        userID: this.visit_user.ID
      }
    })
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

  async share(PostID: number){ // ONLY WORKS ON BUILDS BECAUSE OF HTTPS
    try {
      await navigator.share({
       title: "Nebula Post",
       url: "https://nebula-web.netlify.app/share/" + PostID,
       text: "Come check out this cool post on Nebula!"
      })  
   } catch (err) { 
      this.alert.custom('Whoops. Your Browser doesnt support this feature.', 'OKAY', undefined, 'warning-outline')
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
