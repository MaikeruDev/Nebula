import { Injectable } from '@angular/core';
import { AlertController, AlertOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(public alertController: AlertController) { }

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
    noButtonText: string,
    iconName: string,
    iconColor: string,
    yesButtonCallback: () => void = Function
    ){ 
    const alert = await this.alertController.create({
      header: message, 
      message: '<ion-icon color="' + iconColor + '" name="' + iconName + '"></ion-icon>', 
      buttons: [
        {
          text: noButtonText
        },
        {
          text: yesButtonText,
          handler: () => yesButtonCallback()
        }
      ],
      cssClass: 'fancy-alert', 
    });

    await alert.present();

  } 
}
