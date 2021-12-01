import { Component, OnInit } from '@angular/core';
import { StorageCapService } from '../../app/services/storage-cap.service';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.page.html',
  styleUrls: ['./order-success.page.scss'],
})
export class OrderSuccessPage implements OnInit {
  constructor(private storage: StorageCapService) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.getStorage();
  }

  myDate: String = new Date().toISOString();

  dataTransaction_ID: number;
  dataTransaction_name: string;
  dataTransaction_email: string;
  dataTransaction_addressAddress: string;
  dataTransaction_addressName: string;
  dataTransaction_addressPhone: string;
  dataTransaction_petname: string;
  dataTransaction_pettype: string;
  dataTransaction_date: string;
  dataTransaction_time: string;
  dataTransaction_service: string;
  dataTransaction_package: string;
  dataTransaction_payment: string;
  dataTransaction_packagePayment: number;
  dataTransaction_servicePayment: number;
  dataTransaction_totalamount: number;

  getStorage() {
    this.storage.getObject('storageTransactionFix').then((data: any) => {
      this.dataTransaction_ID = data['transactionFix'][0]['id'];
      this.dataTransaction_name = data['transactionFix'][0]['name'];
      this.dataTransaction_email = data['transactionFix'][0]['email'];
      this.dataTransaction_addressAddress =
        data['transactionFix'][0]['addressAddress'];
      this.dataTransaction_addressName =
        data['transactionFix'][0]['addressName'];
      this.dataTransaction_addressPhone =
        data['transactionFix'][0]['addressPhone'];
      this.dataTransaction_time = data['transactionFix'][0]['time'];
      this.dataTransaction_date = data['transactionFix'][0]['date'];
      this.dataTransaction_package = data['transactionFix'][0]['package'];
      this.dataTransaction_service = data['transactionFix'][0]['service'];
      this.dataTransaction_petname = data['transactionFix'][0]['petname'];
      this.dataTransaction_pettype = data['transactionFix'][0]['pettype'];
      this.dataTransaction_payment = data['transactionFix'][0]['payment'];
      this.dataTransaction_packagePayment =
        data['transactionFix'][0]['packagePayment'];
      this.dataTransaction_servicePayment =
        data['transactionFix'][0]['servicePayment'];
      let amount =
        this.dataTransaction_packagePayment +
        this.dataTransaction_servicePayment;
      this.dataTransaction_totalamount = amount;
    });
  }
}
