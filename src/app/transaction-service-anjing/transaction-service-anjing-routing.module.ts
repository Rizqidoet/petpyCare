import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransactionServiceAnjingPage } from './transaction-service-anjing.page';

const routes: Routes = [
  {
    path: '',
    component: TransactionServiceAnjingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransactionServiceAnjingPageRoutingModule {}
