import { AfterViewInit, Component, EventEmitter, HostListener, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { IonInfiniteScroll, InfiniteScrollCustomEvent, ModalController, ViewWillEnter, ViewDidEnter, NavController, Platform } from '@ionic/angular';
import { ViewerModalComponent } from 'ngx-ionic-image-viewer'; 
import { PostAdapter } from '../adapter/post-adapter';
import { UserAdapter } from '../adapter/user-adapter';
import { NewPostPageModule } from '../modal/new-post/new-post.module'; // Needed
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
export class HomePage implements OnInit, AfterViewInit {

  posts: any = [];
  randomUsers: any = [];

  counter_skip: number = 0;

  no_posts: boolean = false;
  refreshing: boolean = false;
  
  constructor(private router: Router, public platform: Platform, private nav: NavController, private userAdapter: UserAdapter, private postAdapter: PostAdapter, private api: ApiService, private auth: AuthService, private modalController: ModalController) {
   
    router.events.forEach((event) => {
      if(event instanceof NavigationStart && event.url == "/tabs/feed") { //If our site gets called again
        this.ngAfterViewInit()                                            //Update Data
      }
    });

  }
  
  ngAfterViewInit() { 
    if(this.posts.length < 1){
      return
    }

    var temp_posts: any[] = []
    
    this.api.getPosts(0).subscribe((data: any) => {  
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
  }

  trackByFn(index: any, item: any) {
    return item.ID; // return a unique identifier for each item in the array
  }

  ngOnInit(): void {  
    this.platform.resume.subscribe((result)=>{
      console.log("resume")
    });
  
    this.platform.pause.subscribe((result)=>{
      console.log("pause")
    });

    this.fetchPosts(0);
    this.getRandomUsers(3);
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

  visitUser(user: User){
    this.nav.navigateForward('/user', {
      state: {
        user: this.userAdapter.adapt(user)
      }
    })
  }

  onIonInfinite(ev: Event) {
    this.counter_skip += 15;              //Every time the user reaches the last loaded post, the API
    this.fetchPosts(this.counter_skip);   //will look for more posts to load
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

}
