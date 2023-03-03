import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UserAdapter } from 'src/app/adapter/user-adapter';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'Nebula-user-mention',
  templateUrl: './user-mention.page.html',
  styleUrls: ['./user-mention.page.scss'],
})
export class UserMentionPage implements OnInit {

  constructor(private api: ApiService, private userAdapter: UserAdapter, public modalController: ModalController) { }

  users: any = [];
  noUserFound: boolean = false;

  ngOnInit() {
  }

  mention(user: User){
    this.modalController.dismiss({user: user})
  }

  async onSearchChange(event: any){
    const query = event.target.value.toLowerCase();
    this.users = [];
    if(query){
      this.api.searchUsers(query).subscribe(async (data: any) => {
        data.data.forEach((user: User) => {
          this.users.push(this.userAdapter.adapt(user))
        });  
        if(data.data.length == 0) this.noUserFound = true;
        else this.noUserFound = false;
      })
    }
    else this.noUserFound = false;
  }

}
