import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderGroomingPage } from './order-grooming.page';

const routes: Routes = [
  {
    path: '',
    component: OrderGroomingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderGroomingPageRoutingModule {}
