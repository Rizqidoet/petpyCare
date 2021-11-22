import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransactionCukurKucingPage } from './transaction-cukur-kucing.page';

const routes: Routes = [
  {
    path: '',
    component: TransactionCukurKucingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransactionCukurKucingPageRoutingModule {}
