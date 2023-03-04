import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { PostPage } from '../post/post.page';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'Nebula-share',
  templateUrl: './share.page.html',
  styleUrls: ['./share.page.scss'],
})
export class SharePage implements OnInit {

  PostID: any;

  constructor(private modalController: ModalController, private activatedRoute: ActivatedRoute, private nav: NavController) { }

  async ngOnInit() {
    this.activatedRoute.paramMap.subscribe( 
      (data: any) => {    
        this.nav.navigateForward('/post', {
          state: {
            PostID: +data.params.PostID,
            share: true
          }
        }) 
      } 
    );
    
     
  }

}
