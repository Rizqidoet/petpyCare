import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListAddressaddPageRoutingModule } from './list-addressadd-routing.module';

import { ListAddressaddPage } from './list-addressadd.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListAddressaddPageRoutingModule
  ],
  declarations: [ListAddressaddPage]
})
export class ListAddressaddPageModule {}
