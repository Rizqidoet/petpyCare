import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderSelectpetPage } from './order-selectpet.page';

const routes: Routes = [
  {
    path: '',
    component: OrderSelectpetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderSelectpetPageRoutingModule {}
