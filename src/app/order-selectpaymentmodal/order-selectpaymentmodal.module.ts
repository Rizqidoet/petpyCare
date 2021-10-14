import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderSelectpaymentmodalPageRoutingModule } from './order-selectpaymentmodal-routing.module';

import { OrderSelectpaymentmodalPage } from './order-selectpaymentmodal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderSelectpaymentmodalPageRoutingModule
  ],
  declarations: [OrderSelectpaymentmodalPage]
})
export class OrderSelectpaymentmodalPageModule {}
