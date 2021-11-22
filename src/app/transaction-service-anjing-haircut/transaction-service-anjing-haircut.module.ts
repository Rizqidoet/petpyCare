import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransactionServiceAnjingHaircutPageRoutingModule } from './transaction-service-anjing-haircut-routing.module';

import { TransactionServiceAnjingHaircutPage } from './transaction-service-anjing-haircut.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransactionServiceAnjingHaircutPageRoutingModule
  ],
  declarations: [TransactionServiceAnjingHaircutPage]
})
export class TransactionServiceAnjingHaircutPageModule {}
