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
  keys: string;

  constructor(
    public alertController: AlertController,
    private storage: StorageCapService,
    private router: Router
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    // console.log(this.marker);
    this.getStorage();
  }

  getStorage() {
    this.storage.getObject('storageAddress').then((data: any) => {
      if (!data) {
        this.storageAddress = null;
      } else {
        this.storageAddress = data['address'];
      }

      console.log('Isi :', this.storageAddress);
    });
  }

  address: string;
  addressName: string;
  addressPhone: string;

  tapValue(dataAddress) {
    this.storage.removeItem('pickAddress');
    this.address = dataAddress.address;
    this.addressName = dataAddress.addressName;
    this.addressPhone = dataAddress.addressPhone;
    console.log('address :', this.address);
    console.log('address name :', this.addressName);
    console.log('address phone :', this.addressPhone);

    this.storage.setObject('pickAddress', {
      pickAddressAddress: this.address,
      pickAddressName: this.addressName,
      pickAddressPhone: this.addressPhone,
    });

    this.router.navigateByUrl('/transaction');
  }
}
