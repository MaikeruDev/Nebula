import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { PostAdapter } from '../adapter/post-adapter';
import { Post } from '../models/post';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {

  PostID: number;

  post: Post;

  constructor(private postAdapter: PostAdapter, private api: ApiService, private router: Router, private nav: NavController) {
    if (router.getCurrentNavigation()?.extras.state) { 
      this.PostID = this.router?.getCurrentNavigation()?.extras?.state?.PostID
    }
    else{
      this.nav.back() 
    }
  }

  ngOnInit() {
    this.api.getPost(this.PostID).subscribe(post => {
      this.post = this.postAdapter.adapt(post); 
      console.log(this.post);
    })
  }

}
