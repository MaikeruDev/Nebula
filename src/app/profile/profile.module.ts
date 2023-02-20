import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProfilePageRoutingModule } from './profile-routing.module';
import { ProfilePage } from './profile.page';
import { ComponentsModule } from 'src/app/components/components.module'; 
import { DebounceClickProfileDirective } from '../directive/debounce-click-profile.directive';
import { SharedModule } from '../pipes/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule,
    ComponentsModule,
    SharedModule
  ],
  declarations: [ProfilePage, DebounceClickProfileDirective]
})
export class ProfilePageModule {}
