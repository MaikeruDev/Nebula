import { Injectable } from '@angular/core';
import { AlertController, AlertOptions, ToastController } from '@ionic/angular';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(public alertController: AlertController, private api: ApiService, private toastController: ToastController) { }

  async ok(header: string, message: string, subHeader?: string){ 
    const alert = await this.alertController.create({
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  } 

  async custom(
    message: string,
    yesButtonText: string,
    noButtonText: string | undefined,
    iconName: string, 
    yesButtonCallback: () => void = Function
    ){ 

    let btns = []
    
    if (noButtonText){
      btns = [
        {
          text: noButtonText
        },
        {
          text: yesButtonText,
          handler: () => yesButtonCallback()
        }
      ]
    }
    else{
      btns = [ 
        {
          text: yesButtonText,
          handler: () => yesButtonCallback()
        }
      ]
    }

    const alert = await this.alertController.create({
      header: message, 
      message: '<ion-icon name="' + iconName + '"></ion-icon>', 
      buttons: btns,
      cssClass: 'fancy-alert', 
    });

    await alert.present();

  } 

  async change_password(){
    const alert = await this.alertController.create({
      header: 'Please enter your data',
      buttons: [{
        text: 'Change',
        role: 'confirm',
        handler: (data) => {
          if (data.old_pw == "" || data.old_pw.trim() === ""){
            this.showErrorToast("Old Password is empty")
            return
          }
          if (data.new_pw == "" || data.new_pw.trim() === ""){
            this.showErrorToast("New Password is empty")
            return
          }
          if (data.rp_new_pw == "" || data.rp_new_pw.trim() === ""){
            this.showErrorToast("Repeat New Password is empty")
            return
          }

          this.api.changePassword(data).subscribe((res) => {
            if(res.status == "Error"){
              this.showErrorToast(res.errors[0])
            }
            else{
              this.showErrorToast("Password changed")
            }
          })
        }
      }],
      inputs: [ 
        {
          placeholder: 'Old Password',
          type: "password",
          name: "old_pw"
        }, 
        {
          placeholder: 'New Password',
          type: "password",
          name: "new_pw"
        }, 
        {
          placeholder: 'Repeat New Password',
          type: "password",
          name: "rp_new_pw"
        }, 
      ],
      
    });

    await alert.present();
  }

  async showErrorToast(message: string){
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'bottom'
    });

    await toast.present();
  }
}
