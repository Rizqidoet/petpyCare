import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Storage } from '@capacitor/storage';
import { StorageCapService } from '../../app/services/storage-cap.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transaction-selectaddress',
  templateUrl: './transaction-selectaddress.page.html',
  styleUrls: ['./transaction-selectaddress.page.scss'],
})
export class TransactionSelectaddressPage implements OnInit {
  storageAddress = [];

  constructor(
    public alertController: AlertController,
    private storage: StorageCapService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getStorage();
  }

  getStorage() {
    this.storage.getObject('storageAddress').then((data: any) => {
      this.storageAddress = data['address'];
      console.log('Isi :', this.storageAddress);
    });
  }

  tapValue() {
    this.router.navigateByUrl('/transaction');
  }
}
