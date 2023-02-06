import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AlertService } from './alert.service';
import { ApiService } from './api.service';
import { StorageService } from './storage.service';
import { UserService } from './user.service';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authenticationState = new BehaviorSubject<string>(null);
  private decodedUserToken: any = null;

  private helper: JwtHelperService;

  constructor(private api: ApiService, private alert: AlertService, private storageService: StorageService, private router: Router, private userService: UserService) {
    this.helper = new JwtHelperService();
  }

  async storeToken(token: any) {
    await this.storageService.setToken(token);
  }

  public getUserFromToken() {
    return this.decodedUserToken;
  }

  register(obj: any, modal: any){
    return this.api.register(obj).subscribe(async res => {
      let head = 'Congrats';
      let msg = 'Registration successful';
      if (res.status === 'Error') {
        head = 'Error!';
        msg = res.errors[0];
      }

      this.alert.ok(head, msg)

      if (res.status === 'OK') {
        this.storeToken(res.data.token);
        this.decodedUserToken = this.helper.decodeToken(res.data.token); 
        this.userService.fetchUserFromApi(this.getUserFromToken().id);
        modal.dismiss()
        this.router.navigate(['/profile']);
      }

    }),
      catchError(e => {
        this.alert.ok("Error", e.error.message) 
        throw new Error(e);
      });
  }
}
