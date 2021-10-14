import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListAddressaddPage } from './list-addressadd.page';

const routes: Routes = [
  {
    path: '',
    component: ListAddressaddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListAddressaddPageRoutingModule {}
