import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderSelectpetmodalPageRoutingModule } from './order-selectpetmodal-routing.module';

import { OrderSelectpetmodalPage } from './order-selectpetmodal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderSelectpetmodalPageRoutingModule
  ],
  declarations: [OrderSelectpetmodalPage]
})
export class OrderSelectpetmodalPageModule {}
