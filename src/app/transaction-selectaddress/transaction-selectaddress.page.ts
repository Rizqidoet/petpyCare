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
    //this.storage.removeItem('storageAddressPick');
  }

  getStorage() {
    this.storage.getObject('storageAddress').then((data: any) => {
      if (!data) {
        this.storageAddress = null;
      } else {
        this.storageAddress = data['address'];
      }

      // console.log('Isi :', this.storageAddress);
    });
  }

  addressPickaddress: string;
  addressPickName: string;
  addressPickPhone: string;

  tapValue(dataAddress) {
    this.addressPickaddress = dataAddress.address;
    this.addressPickName = dataAddress.addressName;
    this.addressPickPhone = dataAddress.addressPhone;
    // console.log('address :', this.addressPickaddress);
    // console.log('address name :', this.addressPickName);
    // console.log('address phone :', this.addressPickPhone);

    this.storage.setObject('storageAddressPick', {
      storageAddressPickAddress: this.addressPickaddress,
      storageAddressPickName: this.addressPickName,
      storageAddressPickPhone: this.addressPickPhone,
    });

    this.router.navigateByUrl('/transaction');
  }
}
