import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostPageRoutingModule } from './post-routing.module';

import { PostPage } from './post.page';
import { DebounceClickPostDirective } from '../directive/debounce-click-post.directive';
import { TimeAgoPipe } from '../pipes/time-ago.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostPageRoutingModule
  ],
  declarations: [PostPage, DebounceClickPostDirective, TimeAgoPipe]
})
export class PostPageModule {}
