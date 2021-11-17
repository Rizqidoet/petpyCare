import { Component, OnInit } from '@angular/core';
import { StorageCapService } from '../../app/services/storage-cap.service';
import { Platform, ToastController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transaction-confirm',
  templateUrl: './transaction-confirm.page.html',
  styleUrls: ['./transaction-confirm.page.scss'],
})
export class TransactionConfirmPage implements OnInit {
  constructor(
    private platform: Platform,
    public alertController: AlertController,
    private storage: StorageCapService,
    private router: Router
  ) {}

  ionViewWillEnter() {
    this.getStorage();
  }
  ngOnInit() {}

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
    this.storage.getObject('storageTransactions').then((data: any) => {
      this.dataTransaction_name = data['transactions'][0]['name'];
      this.dataTransaction_email = data['transactions'][0]['email'];
      this.dataTransaction_addressAddress =
        data['transactions'][0]['addressAddress'];
      this.dataTransaction_addressName = data['transactions'][0]['addressName'];
      this.dataTransaction_addressPhone =
        data['transactions'][0]['addressPhone'];
      this.dataTransaction_time = data['transactions'][0]['time'];
      this.dataTransaction_date = data['transactions'][0]['date'];
      this.dataTransaction_package = data['transactions'][0]['package'];
      this.dataTransaction_service = data['transactions'][0]['service'];
      this.dataTransaction_petname = data['transactions'][0]['petname'];
      this.dataTransaction_pettype = data['transactions'][0]['pettype'];
      this.dataTransaction_packagePayment =
        data['transactions'][0]['packagePayment'];
      this.dataTransaction_servicePayment =
        data['transactions'][0]['servicePayment'];
      let amount =
        this.dataTransaction_packagePayment +
        this.dataTransaction_servicePayment;
      this.dataTransaction_totalamount = amount;
      console.log(
        'Isi :',
        this.dataTransaction_name +
          this.dataTransaction_email +
          this.dataTransaction_package +
          this.dataTransaction_service
      );
    });
  }

  confirmNo() {
    this.storage.removeItem('storageTransactions');
    this.router.navigateByUrl('/transaction');
  }
  confirmYes() {
    this.storage.removeItem('storageAddressPick');
    this.storage.removeItem('storagePetPick');
    this.router.navigateByUrl('/order-success');
  }
}
