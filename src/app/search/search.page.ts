import { Component, OnInit } from '@angular/core';
import { UserAdapter } from '../adapter/user-adapter';
import { User } from '../models/user';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  constructor(private api: ApiService, private userAdapter: UserAdapter) { }

  users: any = [];
  randomUsers: any = [];
  noUserFound: boolean = false;

  ngOnInit() {
    this.getRandomUsers(3); 
  }

  getRandomUsers(amount: number){
    this.api.getRandomUsers(amount).subscribe((data: any) => {
      data.data.forEach((user: User) => { 
        this.randomUsers.push(this.userAdapter.adapt(user))
      });   
    });
  }

  onSearchChange(event: any){
    const query = event.target.value.toLowerCase();
    this.users = [];
    if(query){
      this.api.searchUsers(query).subscribe((data: any) => {
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
