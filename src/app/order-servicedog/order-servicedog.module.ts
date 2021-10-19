import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderServicedogPageRoutingModule } from './order-servicedog-routing.module';

import { OrderServicedogPage } from './order-servicedog.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderServicedogPageRoutingModule
  ],
  declarations: [OrderServicedogPage]
})
export class OrderServicedogPageModule {}
