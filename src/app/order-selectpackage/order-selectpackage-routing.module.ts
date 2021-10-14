import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderSelectpackagePage } from './order-selectpackage.page';

const routes: Routes = [
  {
    path: '',
    component: OrderSelectpackagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderSelectpackagePageRoutingModule {}
