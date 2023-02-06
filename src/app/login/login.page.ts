import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, AnimationController, IonModal } from '@ionic/angular'; 
import { OverlayEventDetail } from '@ionic/core/components';
import { catchError } from 'rxjs/operators';
import { AlertService } from '../services/alert.service';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  @ViewChild('register_modal') register_modal: IonModal;
  @ViewChild('login_modal') login_modal: IonModal;

  login_name: string = "";
  login_password: string = "";

  register_name : string = "";
  register_email : string = "";
  register_password : string = "";
  register_handle: string = "";

  constructor(private alert: AlertService, public api: ApiService, private auth: AuthService) { }

  async ngOnInit() {
    
  }

  register_cancel() {
    this.register_modal.dismiss(null, 'cancel');
  }

  register_confirm() {
    if (this.register_name.trim() === "" || this.register_name === undefined || this.register_password.trim() === "" || this.register_password === undefined || this.register_email.trim() === "" || this.register_email === undefined || this.register_handle.trim() === "" || this.register_handle === undefined) {
      this.alert.ok("Warning", "Please fill in every field.")
      return;
    } 

    if (this.register_password.trim().length < 5){
      this.alert.ok("Warning", "The password needs to have at least 5 characters.")
      return;
    }

    this.auth.register({email: this.register_email, username: this.register_name, handle: this.register_handle, password: this.register_password}, this.register_modal)    
  }

  login_cancel() {
    this.login_modal.dismiss(null, 'cancel'); 
  }

  login_confirm() { 
    if (this.login_name.trim() === "" || this.login_name === undefined || this.login_password.trim() === "" || this.login_password === undefined) {
      this.alert.ok("Warning","Please fill in every field.")
      return;
    }  

    this.api.login(this.login_name, this.login_password) 
  } 

  async delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

}
