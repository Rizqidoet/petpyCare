import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderSelectpaymentPage } from './order-selectpayment.page';

const routes: Routes = [
  {
    path: '',
    component: OrderSelectpaymentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderSelectpaymentPageRoutingModule {}
