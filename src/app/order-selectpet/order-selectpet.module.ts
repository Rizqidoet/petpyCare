import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderSelectpetPageRoutingModule } from './order-selectpet-routing.module';

import { OrderSelectpetPage } from './order-selectpet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderSelectpetPageRoutingModule
  ],
  declarations: [OrderSelectpetPage]
})
export class OrderSelectpetPageModule {}
