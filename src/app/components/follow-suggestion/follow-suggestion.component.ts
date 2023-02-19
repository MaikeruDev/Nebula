import { Component, OnInit, Input } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UserAdapter } from 'src/app/adapter/user-adapter';
import { ApiService } from 'src/app/services/api.service';
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

  visitUser(user: User){
    console.log(user)
    this.nav.navigateForward('/user', {
      state: {
        user: user
      }
    })
  }

}
