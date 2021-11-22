import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransactionCukurKucingPageRoutingModule } from './transaction-cukur-kucing-routing.module';

import { TransactionCukurKucingPage } from './transaction-cukur-kucing.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransactionCukurKucingPageRoutingModule
  ],
  declarations: [TransactionCukurKucingPage]
})
export class TransactionCukurKucingPageModule {}
