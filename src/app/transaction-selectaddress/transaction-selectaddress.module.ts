import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransactionSelectaddressPageRoutingModule } from './transaction-selectaddress-routing.module';

import { TransactionSelectaddressPage } from './transaction-selectaddress.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransactionSelectaddressPageRoutingModule
  ],
  declarations: [TransactionSelectaddressPage]
})
export class TransactionSelectaddressPageModule {}
