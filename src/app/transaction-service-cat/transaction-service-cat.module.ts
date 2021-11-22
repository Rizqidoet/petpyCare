import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransactionServiceCatPageRoutingModule } from './transaction-service-cat-routing.module';

import { TransactionServiceCatPage } from './transaction-service-cat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransactionServiceCatPageRoutingModule
  ],
  declarations: [TransactionServiceCatPage]
})
export class TransactionServiceCatPageModule {}
