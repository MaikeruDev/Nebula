import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.page.html',
  styleUrls: ['./new-post.page.scss'],
})
export class NewPostPage implements OnInit {

  user: User;
  progress: number = 0.5

  constructor(private auth: AuthService, private nav: NavController, private userService: UserService) { }

  ngOnInit() {
    this.userService.getCurrentUser().subscribe(user => {
      this.user = user;
    });
  }

  progressHandler(ev: any){
    var len = ev.detail.value.length
    this.progress = (len / 300)
  }

  cancelPost(){
    this.nav.back()
  }

}
