import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderServicedogPage } from './order-servicedog.page';

const routes: Routes = [
  {
    path: '',
    component: OrderServicedogPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderServicedogPageRoutingModule {}
