import { Component, OnInit, Input, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UserAdapter } from 'src/app/adapter/user-adapter'; 
import { ApiService } from 'src/app/services/api.service'
import { User } from '../../models/user';

@Component({
  selector: 'app-follow-suggestion',
  templateUrl: './follow-suggestion.component.html',
  styleUrls: ['./follow-suggestion.component.scss'], 
})
export class FollowSuggestionComponent implements OnInit {

  @Input() randomUsers: any = [];

  constructor(private nav: NavController, private userAdapter: UserAdapter, private api: ApiService) { }

  ngOnInit() {}

  visitUser(event: Event, user: User){
    const target = event.target as HTMLElement;
    if (target.tagName.toLowerCase() === 'ion-button') {
      return;
    }
    this.nav.navigateForward('/user', {
      state: {
        user: user
      }
    })
  }

  follow_change(index: number){
    if(this.randomUsers[index].Self_Following){
      this.randomUsers[index].Self_Following = false 
      this.api.unfollow(this.randomUsers[index]).subscribe()
    } 
    else {
      this.randomUsers[index].Self_Following = true 
      this.api.follow(this.randomUsers[index]).subscribe()
    }
  }

}
