import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderSelectpaymentmodalPage } from './order-selectpaymentmodal.page';

const routes: Routes = [
  {
    path: '',
    component: OrderSelectpaymentmodalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderSelectpaymentmodalPageRoutingModule {}
