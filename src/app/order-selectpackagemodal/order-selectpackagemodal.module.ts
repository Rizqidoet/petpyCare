import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderSelectpackagemodalPageRoutingModule } from './order-selectpackagemodal-routing.module';

import { OrderSelectpackagemodalPage } from './order-selectpackagemodal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderSelectpackagemodalPageRoutingModule
  ],
  declarations: [OrderSelectpackagemodalPage]
})
export class OrderSelectpackagemodalPageModule {}
