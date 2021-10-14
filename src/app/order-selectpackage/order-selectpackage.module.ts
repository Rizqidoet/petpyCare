import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderSelectpackagePageRoutingModule } from './order-selectpackage-routing.module';

import { OrderSelectpackagePage } from './order-selectpackage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderSelectpackagePageRoutingModule
  ],
  declarations: [OrderSelectpackagePage]
})
export class OrderSelectpackagePageModule {}
