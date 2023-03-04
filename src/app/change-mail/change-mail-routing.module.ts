import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChangeMailPage } from './change-mail.page';

const routes: Routes = [
  {
    path: '',
    component: ChangeMailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChangeMailPageRoutingModule {}
