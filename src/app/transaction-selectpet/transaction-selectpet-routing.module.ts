import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransactionSelectpetPage } from './transaction-selectpet.page';

const routes: Routes = [
  {
    path: '',
    component: TransactionSelectpetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransactionSelectpetPageRoutingModule {}
