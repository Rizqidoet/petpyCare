import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Storage } from '@capacitor/storage';
import { StorageCapService } from '../../app/services/storage-cap.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-address',
  templateUrl: './list-address.page.html',
  styleUrls: ['./list-address.page.scss'],
})
export class ListAddressPage implements OnInit {
  storageAddress = [];

  constructor(
    public alertController: AlertController,
    private storage: StorageCapService,
    private router: Router
  ) {}

  dataAddresses = [
    {
      id: 1,
      name: 'Rumah Pribadi',
      detail: 'Jl. Jalan Dulu Ampe Pegel',
    },
    {
      id: 2,
      name: 'Rumah Mertua',
      detail: 'Jl. Mulu Naek Mobil Kek',
    },
    {
      id: 3,
      name: 'Kantor',
      detail: 'Jl. in Aja Dah, Emg Begini Nasibnye',
    },
  ];

  getStorage() {
    this.storage.getObject('storageAddress').then((data: any) => {
      this.storageAddress = data['address'];
      console.log('Isi :', this.storageAddress);
    });
  }

  async inputCustomAddressValue() {
    console.log('Input async');
    const inputAlert = await this.alertController.create({
      header: 'Add your Address:',
      inputs: [
        { type: 'text', placeholder: 'Address Name' },
        { type: 'text', placeholder: 'Address Detail' },
      ],
      buttons: [
        { text: 'Cancel' },
        {
          text: 'Ok',
          handler: (valueNewAddress) => {
            var indexLen = this.storageAddress.length;
            var newId = 1 + indexLen;
            console.log('Sebelum: ', indexLen);
            var dataBaru = {
              id: newId,
              name: valueNewAddress[0],
              detail: valueNewAddress[1],
            };
            console.log('Sesudah: ', indexLen);
            console.log(this.storageAddress);
            this.storageAddress.push(dataBaru);
            this.storage.setObject('storageAddress', {
              address: this.storageAddress,
            });
            this.getStorage();
          },
        },
      ],
    });
    console.log('Berhasil', inputAlert);
    await inputAlert.present();
  }

  tapValue() {
    this.router.navigateByUrl('/transaction');
  }

  ngOnInit() {
    this.getStorage();
  }
}
