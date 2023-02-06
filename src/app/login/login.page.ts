import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, AnimationController, IonModal } from '@ionic/angular'; 
import { OverlayEventDetail } from '@ionic/core/components';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { AlertService } from '../services/alert.service';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  @ViewChild('register_modal') register_modal: IonModal;
  @ViewChild('login_modal') login_modal: IonModal;

  registerForm: FormGroup;

  loginForm: FormGroup;

  constructor(private alert: AlertService, public api: ApiService, private auth: AuthService) {
    this.registerForm = new FormGroup({
      reg_email: new FormControl<string | null>('', [Validators.required, Validators.email]),
      reg_username: new FormControl<string | null>('', [Validators.required, Validators.minLength(3)]),
      reg_handle: new FormControl<string | null>('', [Validators.required, Validators.minLength(3)]),
      reg_password: new FormControl<string | null>('', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[\S]{6,}$/)]),
    });

    this.loginForm = new FormGroup({
      log_email: new FormControl<string | null>('', [Validators.required, Validators.email]), 
      log_password: new FormControl<string | null>('', [Validators.required, Validators.minLength(1)]),
    });
  }

  get reg_email() {return this.registerForm.get('reg_email');} 
  get reg_username() {return this.registerForm.get('reg_username');} 
  get reg_handle() {return this.registerForm.get('reg_handle');} 
  get reg_password() {return this.registerForm.get('reg_password');}

  get log_email() {return this.loginForm.get('log_email');} 
  get log_password() {return this.loginForm.get('log_password');} 

  async ngOnInit() {
    
  }

  register_cancel() {
    this.register_modal.dismiss(null, 'cancel');
  }

  register_confirm() { 
    if (this.registerForm.valid) { 
      this.auth.register({email: this.reg_email!.value, username: this.reg_username!.value, handle: this.reg_handle!.value, password: this.reg_password!.value}, this.register_modal);
    }
  }

  login_cancel() {
    this.login_modal.dismiss(null, 'cancel'); 
  }

  login_confirm() {  
    if (this.loginForm.valid) { 
      this.auth.login({email: this.log_email!.value, password: this.log_password!.value}, this.login_modal);
    }
  } 

  async delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

}
