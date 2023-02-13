import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AlertService } from './alert.service';
import { ApiService } from './api.service';
import { StorageService } from './storage.service';
import { UserService } from './user.service';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authenticationState = new BehaviorSubject<string>(null!);
  private decodedUserToken: any = null;

  private helper: JwtHelperService;

  constructor(private platform: Platform, private api: ApiService, private alert: AlertService, private storageService: StorageService, private router: Router, private userService: UserService) {
    this.helper = new JwtHelperService();

    this.platform.ready().then(() => {
      this.checkToken();
    });
  }

  checkToken() {
    const token = this.storageService.getToken();
    if (token) {
      const decoded = this.helper.decodeToken(token);
      const isExpired = this.helper.isTokenExpired(token);

      if (!isExpired) {
        this.decodedUserToken = decoded;
        this.updateAuthenticationState(decoded); 
        this.userService.fetchUserFromApi(this.getUserFromToken().id); 
      }
    }
    else {
      this.authenticationState.next('none');
    }
  }

  updateAuthenticationState(token: any) {
    console.log(token.id)
    if (token.id == 1 || token.id == 2) {
      this.authenticationState.next('admin');
    } else {
      this.authenticationState.next('user'); 
    }
    //if(token) this.authenticationState.next('user'); 
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
        this.updateAuthenticationState(this.decodedUserToken);
        this.userService.fetchUserFromApi(this.getUserFromToken().id);
        modal.dismiss()
        this.router.navigate(['/feed']);
      }

    }),
      catchError(e => {
        this.alert.ok("Error", e.error.message) 
        throw new Error(e);
      });
  }
  
  login(obj: any, modal: any){
    return this.api.login(obj.email, obj.password).subscribe(async res => {
      if (res.status === 'OK') {
        this.storeToken(res.data.token);
        this.decodedUserToken = this.helper.decodeToken(res.data.token); 
        this.updateAuthenticationState(this.decodedUserToken);
        this.userService.fetchUserFromApi(this.getUserFromToken().id);
        modal.dismiss()
        this.router.navigate(['/feed']);
      }
      else {
        this.alert.ok('Ooops', res.errors[0]);
      }

    }),
      catchError(e => {
        this.alert.ok('Error', e.error.message);
        throw new Error(e);
      }); 
  }

  logout() {
    this.storageService.removeToken();
    this.userService.clearData(); 
    this.decodedUserToken = null;
    this.authenticationState.next('none');
    this.router.navigate(['login']);
  }
  

}
