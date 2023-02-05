import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular'; 
import { ViewerModalComponent } from 'ngx-ionic-image-viewer';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  users = [
    { 
      profilePicture: "https://picsum.photos/200",
      username: "Michael Prietl",
      handle: "@Maikeru",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      date: "Jan 1, 2021",
      retweets: 120,
      likes: 450,
      comments: 50
    },
    { 
      profilePicture: "https://picsum.photos/200",
      username: "Michael Prietl",
      handle: "@Maikeru",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      date: "Jan 1, 2021",
      retweets: 120,
      likes: 450,
      comments: 50
    },
    { 
      profilePicture: "https://picsum.photos/200",
      username: "Michael Prietl",
      handle: "@Maikeru",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      date: "Jan 1, 2021",
      retweets: 120,
      likes: 450,
      comments: 50
    },
    { 
      profilePicture: "https://picsum.photos/200",
      username: "Michael Prietl",
      handle: "@Maikeru",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      date: "Jan 1, 2021",
      retweets: 120,
      likes: 450,
      comments: 50
    },
    { 
      profilePicture: "https://picsum.photos/200",
      username: "Michael Prietl",
      handle: "@Maikeru",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      date: "Jan 1, 2021",
      retweets: 120,
      likes: 450,
      comments: 50
    },
    { 
      profilePicture: "https://picsum.photos/200",
      username: "Michael Prietl",
      handle: "@Maikeru",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      date: "Jan 1, 2021",
      retweets: 120,
      likes: 450,
      comments: 50
    },
    { 
      profilePicture: "https://picsum.photos/200",
      username: "Michael Prietl",
      handle: "@Maikeru",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      date: "Jan 1, 2021",
      retweets: 120,
      likes: 450,
      comments: 50
    },
    { 
      profilePicture: "https://picsum.photos/200",
      username: "Michael Prietl",
      handle: "@Maikeru",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      date: "Jan 1, 2021",
      retweets: 120,
      likes: 450,
      comments: 50
    },
    { 
      profilePicture: "https://picsum.photos/200",
      username: "Michael Prietl",
      handle: "@Maikeru",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      date: "Jan 1, 2021",
      retweets: 120,
      likes: 450,
      comments: 50
    },
    { 
      profilePicture: "https://picsum.photos/200",
      username: "Michael Prietl",
      handle: "@Maikeru",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      date: "Jan 1, 2021",
      retweets: 120,
      likes: 450,
      comments: 50
    },
    { 
      profilePicture: "https://picsum.photos/200",
      username: "Michael Prietl",
      handle: "@Maikeru",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      date: "Jan 1, 2021",
      retweets: 120,
      likes: 450,
      comments: 50
    },
    { 
      profilePicture: "https://picsum.photos/200",
      username: "Michael Prietl",
      handle: "@Maikeru",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      date: "Jan 1, 2021",
      retweets: 120,
      likes: 450,
      comments: 50
    },
    { 
      profilePicture: "https://picsum.photos/200",
      username: "Michael Prietl",
      handle: "@Maikeru",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      date: "Jan 1, 2021",
      retweets: 120,
      likes: 450,
      comments: 50
    },
    { 
      profilePicture: "https://picsum.photos/200",
      username: "Michael Prietl",
      handle: "@Maikeru",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      date: "Jan 1, 2021",
      retweets: 120,
      likes: 450,
      comments: 50
    },
    { 
      profilePicture: "https://picsum.photos/200",
      username: "Michael Prietl",
      handle: "@Maikeru",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      date: "Jan 1, 2021",
      retweets: 120,
      likes: 450,
      comments: 50
    },
    { 
      profilePicture: "https://picsum.photos/200",
      username: "Michael Prietl",
      handle: "@Maikeru",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      date: "Jan 1, 2021",
      retweets: 120,
      likes: 450,
      comments: 50
    },
    { 
      profilePicture: "https://picsum.photos/200",
      username: "Michael Prietl",
      handle: "@Maikeru",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      date: "Jan 1, 2021",
      retweets: 120,
      likes: 450,
      comments: 50
    }
  ]

  constructor(private modalController: ModalController) { }

  ngOnInit() {
    
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
