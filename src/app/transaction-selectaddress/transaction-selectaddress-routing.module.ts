import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransactionSelectaddressPage } from './transaction-selectaddress.page';

const routes: Routes = [
  {
    path: '',
    component: TransactionSelectaddressPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransactionSelectaddressPageRoutingModule {}
