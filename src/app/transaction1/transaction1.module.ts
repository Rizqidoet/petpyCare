import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Transaction1PageRoutingModule } from './transaction1-routing.module';

import { Transaction1Page } from './transaction1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Transaction1PageRoutingModule
  ],
  declarations: [Transaction1Page]
})
export class Transaction1PageModule {}
