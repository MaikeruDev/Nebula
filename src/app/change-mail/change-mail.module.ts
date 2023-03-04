import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChangeMailPageRoutingModule } from './change-mail-routing.module';

import { ChangeMailPage } from './change-mail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChangeMailPageRoutingModule
  ],
  declarations: [ChangeMailPage]
})
export class ChangeMailPageModule {}
