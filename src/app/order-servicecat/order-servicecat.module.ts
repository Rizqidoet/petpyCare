import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderServicecatPageRoutingModule } from './order-servicecat-routing.module';

import { OrderServicecatPage } from './order-servicecat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderServicecatPageRoutingModule
  ],
  declarations: [OrderServicecatPage]
})
export class OrderServicecatPageModule {}
