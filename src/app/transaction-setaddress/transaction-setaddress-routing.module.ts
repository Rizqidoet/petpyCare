import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransactionSetaddressPage } from './transaction-setaddress.page';

const routes: Routes = [
  {
    path: '',
    component: TransactionSetaddressPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransactionSetaddressPageRoutingModule {}
