import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Transaction1Page } from './transaction1.page';

const routes: Routes = [
  {
    path: '',
    component: Transaction1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Transaction1PageRoutingModule {}
