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
    private router: Router,
    private toastController: ToastController
  ) {}

  ionViewWillEnter() {
    this.getStorage();
  }
  ngOnInit() {}

  async showToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000,
    });
    toast.present();
  }

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
      this.dataTransaction_payment = data['transactions'][0]['payment'];
      this.dataTransaction_packagePayment =
        data['transactions'][0]['packagePayment'];
      this.dataTransaction_servicePayment =
        data['transactions'][0]['servicePayment'];
      let amount =
        this.dataTransaction_packagePayment +
        this.dataTransaction_servicePayment;
      this.dataTransaction_totalamount = amount;
      // console.log(
      //   'Isi :',
      //   this.dataTransaction_name +
      //     this.dataTransaction_email +
      //     this.dataTransaction_package +
      //     this.dataTransaction_service
      // );
    });

    this.storage.getObject('storageFilterPet').then((data: any) => {
      this.pickMenu = data.name;
      this.categoryPet = data.category;
      // console.log('Ngaco', this.categoryPet);
    });
  }

  pickMenu: String;
  categoryPet: String;
  confirmNo() {
    // this.storage.removeItem('storageTransactions');
    //this.storage.removeItem('storagePetPick');
    //this.storage.removeItem('storageAddressPick');

    this.router.navigateByUrl('/transaction-' + this.pickMenu);
  }

  transactionfix = [];
  confirmYes() {
    console.log('_________________HASIL___________');
    console.log('Name : ', this.dataTransaction_name);
    console.log('Email : ', this.dataTransaction_email);
    console.log('Package : ', this.dataTransaction_package);
    console.log('Service : ', this.dataTransaction_service);
    console.log('Address : ', this.dataTransaction_addressAddress);
    console.log('Name Address : ', this.dataTransaction_addressName);
    console.log('Phone Address : ', this.dataTransaction_addressPhone);
    console.log('Pet Name : ', this.dataTransaction_petname);
    console.log('Pet Type : ', this.dataTransaction_pettype);
    console.log('Date : ', this.dataTransaction_date);
    console.log('Time : ', this.dataTransaction_time);
    console.log('Payment : ', this.dataTransaction_payment);
    console.log('_________________________________');

    var indexLen = this.transactionfix.length;
    var newId = 1 + indexLen;
    var dataTransaction = {
      id: 'TID-00' + newId,
      name: this.dataTransaction_name,
      email: this.dataTransaction_email,
      service: this.dataTransaction_package,
      package: this.dataTransaction_service,
      addressAddress: this.dataTransaction_addressAddress,
      addressName: this.dataTransaction_addressName,
      addressPhone: this.dataTransaction_addressPhone,
      petname: this.dataTransaction_petname,
      pettype: this.dataTransaction_pettype,
      date: this.dataTransaction_date,
      time: this.dataTransaction_time,
      packagePayment: 85000,
      servicePayment: 15000,
      payment: this.dataTransaction_payment,
    };
    //sebelum push check ada data di this.transactions
    if (this.transactionfix.length > 0) {
      this.transactionfix.length = 0;
    }
    this.transactionfix.push(dataTransaction);
    this.storage.setObject('storageTransactionFix', {
      transactionFix: this.transactionfix,
    });
    this.showToast('order successfully made');

    this.storage.removeItem('storageAddressPick');
    this.storage.removeItem('storagePetPick');
    this.storage.removeItem('storageTransactions');
    this.router.navigateByUrl('order-success');
  }
}
