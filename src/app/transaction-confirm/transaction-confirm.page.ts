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

  ngOnInit() {
    this.getStorage();
  }

  dataTransaction_name: string;
  dataTransaction_email: string;
  dataTransaction_phone: string;
  dataTransaction_address: string;
  dataTransaction_petname: string;
  dataTransaction_petdetail: string;
  dataTransaction_date: string;
  dataTransaction_service: string;
  dataTransaction_package: string;
  dataTransaction_payment: string;
  dataTransaction_totalamount: string;

  getStorage() {
    this.storage.getObject('storageTransactions').then((data: any) => {
      this.dataTransaction_name = data['transactions'][0]['name'];
      this.dataTransaction_email = data['transactions'][0]['email'];
      this.dataTransaction_service = data['transactions'][0]['service'];
      console.log(
        'Isi :',
        this.dataTransaction_name +
          this.dataTransaction_email +
          this.dataTransaction_service
      );
    });
  }

  confirmNo() {
    this.router.navigateByUrl('/transaction');
  }
  confirmYes() {
    this.router.navigateByUrl('/order-success');
  }
}
