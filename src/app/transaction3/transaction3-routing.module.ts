import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Transaction3Page } from './transaction3.page';

const routes: Routes = [
  {
    path: '',
    component: Transaction3Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Transaction3PageRoutingModule {}
