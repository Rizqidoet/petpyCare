import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransactionSetaddressPageRoutingModule } from './transaction-setaddress-routing.module';

import { TransactionSetaddressPage } from './transaction-setaddress.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransactionSetaddressPageRoutingModule
  ],
  declarations: [TransactionSetaddressPage]
})
export class TransactionSetaddressPageModule {}
