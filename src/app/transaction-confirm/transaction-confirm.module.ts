import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransactionConfirmPageRoutingModule } from './transaction-confirm-routing.module';

import { TransactionConfirmPage } from './transaction-confirm.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransactionConfirmPageRoutingModule
  ],
  declarations: [TransactionConfirmPage]
})
export class TransactionConfirmPageModule {}
