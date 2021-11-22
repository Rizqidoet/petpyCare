import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransactionServiceAnjingPageRoutingModule } from './transaction-service-anjing-routing.module';

import { TransactionServiceAnjingPage } from './transaction-service-anjing.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransactionServiceAnjingPageRoutingModule
  ],
  declarations: [TransactionServiceAnjingPage]
})
export class TransactionServiceAnjingPageModule {}
