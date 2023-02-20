import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostPageRoutingModule } from './post-routing.module';

import { PostPage } from './post.page';
import { DebounceClickPostDirective } from '../directive/debounce-click-post.directive'; 
import { SharedModule } from '../pipes/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostPageRoutingModule,
    SharedModule
  ],
  declarations: [PostPage, DebounceClickPostDirective]
})
export class PostPageModule {}
