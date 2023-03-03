import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserMentionPageRoutingModule } from './user-mention-routing.module';

import { UserMentionPage } from './user-mention.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserMentionPageRoutingModule
  ],
  declarations: [UserMentionPage]
})
export class UserMentionPageModule {}
