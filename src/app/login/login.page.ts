import { Component, OnInit, ViewChild } from '@angular/core';
import { AnimationController, IonModal } from '@ionic/angular'; 
import { OverlayEventDetail } from '@ionic/core/components';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  @ViewChild('register_modal') register_modal: IonModal;
  @ViewChild('login_modal') login_modal: IonModal;

  login_name: string;
  login_password: string;

  register_name : string;
  register_email : string;
  register_password : string;

  constructor(private animationCtrl: AnimationController, public api: ApiService) { }

  async ngOnInit() {
    this.api.register("", "", "")
  }

  register_cancel() {
    this.register_modal.dismiss(null, 'cancel');
  }

  register_confirm() {
    this.register_modal.dismiss(null, 'confirm');
  }

  register_onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm' && !!ev.detail.data) {
      console.log(`Hello, ${ev.detail.data}!`);
    }
  }

  login_cancel() {
    this.login_modal.dismiss(null, 'cancel');
    this.register_modal.dismiss(null, 'cancel');
  }

  login_confirm() {
    this.login_modal.dismiss(null, 'confirm');
  }

  login_onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm' && !!ev.detail.data) {
      console.log(`Hello, ${ev.detail.data}!`);
    }
  }

  async delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

}
