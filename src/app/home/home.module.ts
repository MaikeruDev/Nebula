import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { DebounceClickDirective } from '../directive/debounce-click.directive';
import { SharedModule } from '../pipes/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ComponentsModule,
    SharedModule
  ],
  declarations: [HomePage, DebounceClickDirective]
})
export class HomePageModule {}
