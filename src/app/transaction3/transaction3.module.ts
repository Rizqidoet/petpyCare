import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Transaction3PageRoutingModule } from './transaction3-routing.module';

import { Transaction3Page } from './transaction3.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Transaction3PageRoutingModule
  ],
  declarations: [Transaction3Page]
})
export class Transaction3PageModule {}
