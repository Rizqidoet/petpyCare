import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Transaction1modalPageRoutingModule } from './transaction1modal-routing.module';

import { Transaction1modalPage } from './transaction1modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Transaction1modalPageRoutingModule
  ],
  declarations: [Transaction1modalPage]
})
export class Transaction1modalPageModule {}
