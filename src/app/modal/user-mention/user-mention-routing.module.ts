import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserMentionPage } from './user-mention.page';

const routes: Routes = [
  {
    path: '',
    component: UserMentionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserMentionPageRoutingModule {}
