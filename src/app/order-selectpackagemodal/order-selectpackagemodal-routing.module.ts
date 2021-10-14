import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderSelectpackagemodalPage } from './order-selectpackagemodal.page';

const routes: Routes = [
  {
    path: '',
    component: OrderSelectpackagemodalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderSelectpackagemodalPageRoutingModule {}
