import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderServicecatPage } from './order-servicecat.page';

const routes: Routes = [
  {
    path: '',
    component: OrderServicecatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderServicecatPageRoutingModule {}
