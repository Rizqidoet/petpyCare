import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Transaction2PageRoutingModule } from './transaction2-routing.module';

import { Transaction2Page } from './transaction2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Transaction2PageRoutingModule
  ],
  declarations: [Transaction2Page]
})
export class Transaction2PageModule {}
