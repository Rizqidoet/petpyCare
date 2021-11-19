import { Component, OnInit } from '@angular/core';
import { StorageCapService } from '../../app/services/storage-cap.service';
import { Router } from '@angular/router';

import { ModalController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-transaction-selectpet',
  templateUrl: './transaction-selectpet.page.html',
  styleUrls: ['./transaction-selectpet.page.scss'],
})
export class TransactionSelectpetPage implements OnInit {
  constructor(
    public alertController: AlertController,
    private storage: StorageCapService,
    private router: Router
  ) {}

  ionViewWillEnter() {
    // console.log(this.marker);
    this.storage.removeItem('storagePetPick');
    this.getStorage();
  }

  ngOnInit() {}

  pets = [];
  jumlahArrayStorage: number;
  storageArrayPet = [];

  getStorage() {
    this.storage.getObject('storagePet').then((data: any) => {
      if (!data) {
        this.jumlahArrayStorage = 0;
        this.storageArrayPet = [];
        //console.log('jumlahArrayStorage kosong', this.jumlahArrayStorage);
      } else {
        this.storageArrayPet = data['Pets'];
        this.jumlahArrayStorage = this.storageArrayPet.length;
        //console.log('jumlahArrayStorage isi', this.jumlahArrayStorage);
      }

      //console.log('jumlah Array Storage OnLoad :', this.jumlahArrayStorage);
    });
  }

  async addPet() {
    //console.log('Add Pet Function Async');
    const inputAlert = await this.alertController.create({
      header: 'type your pet here',
      inputs: [
        { type: 'text', placeholder: 'name : simba' },
        { type: 'text', placeholder: 'type  : kucing' },
      ],
      buttons: [
        { text: 'Cancel' },
        {
          text: 'Ok',
          handler: (valueNewPet) => {
            var indexLen = this.storageArrayPet.length;
            var newId = 1 + indexLen;

            var dataBaru = {
              id: newId,
              name: valueNewPet[0],
              type: valueNewPet[1],
            };

            this.storageArrayPet.push(dataBaru);
            this.storage.setObject('storagePet', {
              Pets: this.storageArrayPet,
            });
            // console.log(this.storageArrayPet);
            //this.getStorage();
          },
        },
      ],
    });
    //console.log('Berhasil', inputAlert);
    await inputAlert.present();
  }

  petName: string;
  petType: string;

  tapValue(storagePet) {
    this.petName = storagePet.name;
    this.petType = storagePet.type;

    // console.log('pet pick name :', this.petName);
    // console.log('pet pick type :', this.petType);

    this.storage.setObject('storagePetPick', {
      storagePetPickName: this.petName,
      storagePetPickType: this.petType,
    });

    this.router.navigateByUrl('/transaction');
  }
}
