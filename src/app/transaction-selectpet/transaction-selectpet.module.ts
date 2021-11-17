import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransactionSelectpetPageRoutingModule } from './transaction-selectpet-routing.module';

import { TransactionSelectpetPage } from './transaction-selectpet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransactionSelectpetPageRoutingModule
  ],
  declarations: [TransactionSelectpetPage]
})
export class TransactionSelectpetPageModule {}
