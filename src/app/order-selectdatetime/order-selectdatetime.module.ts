import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderSelectdatetimePageRoutingModule } from './order-selectdatetime-routing.module';

import { OrderSelectdatetimePage } from './order-selectdatetime.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderSelectdatetimePageRoutingModule
  ],
  declarations: [OrderSelectdatetimePage]
})
export class OrderSelectdatetimePageModule {}
