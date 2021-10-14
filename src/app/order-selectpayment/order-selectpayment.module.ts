import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderSelectpaymentPageRoutingModule } from './order-selectpayment-routing.module';

import { OrderSelectpaymentPage } from './order-selectpayment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderSelectpaymentPageRoutingModule
  ],
  declarations: [OrderSelectpaymentPage]
})
export class OrderSelectpaymentPageModule {}
