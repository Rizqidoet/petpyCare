import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransactionServiceCatPage } from './transaction-service-cat.page';

const routes: Routes = [
  {
    path: '',
    component: TransactionServiceCatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransactionServiceCatPageRoutingModule {}
