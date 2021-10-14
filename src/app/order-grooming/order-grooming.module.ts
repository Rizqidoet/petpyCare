import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderGroomingPageRoutingModule } from './order-grooming-routing.module';

import { OrderGroomingPage } from './order-grooming.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderGroomingPageRoutingModule
  ],
  declarations: [OrderGroomingPage]
})
export class OrderGroomingPageModule {}
