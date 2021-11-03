import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Transaction2Page } from './transaction2.page';

const routes: Routes = [
  {
    path: '',
    component: Transaction2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Transaction2PageRoutingModule {}
