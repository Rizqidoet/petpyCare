import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderSelectpetmodalPage } from './order-selectpetmodal.page';

const routes: Routes = [
  {
    path: '',
    component: OrderSelectpetmodalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderSelectpetmodalPageRoutingModule {}
