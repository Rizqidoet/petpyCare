import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderSelectdatetimePage } from './order-selectdatetime.page';

const routes: Routes = [
  {
    path: '',
    component: OrderSelectdatetimePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderSelectdatetimePageRoutingModule {}
