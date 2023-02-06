import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user = new BehaviorSubject<User>(null);

  constructor(private apiService: ApiService) {
    this.getCurrentUser().subscribe();
  }

  getCurrentUser(): Observable<User> {
    return this.user;
  }

  fetchUserFromApi(id?: number): void {  
    this.apiService.getUserById(id ?? this.user.value.ID ?? -1).subscribe(user => {
      this.user.next(user);
    });
  }



  clearData(): void {
    this.user.next(null);
  }
}
