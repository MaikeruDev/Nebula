import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { FollowSuggestionComponent } from './follow-suggestion/follow-suggestion.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,   
  ],
  exports: [
    FollowSuggestionComponent
  ],
  declarations: [FollowSuggestionComponent],
})
export class ComponentsModule {}
