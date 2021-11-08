import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Storage } from '@capacitor/storage';
import { StorageCapService } from '../../app/services/storage-cap.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-selectpetmodal',
  templateUrl: './order-selectpetmodal.page.html',
  styleUrls: ['./order-selectpetmodal.page.scss'],
})
export class OrderSelectpetmodalPage implements OnInit {
  pets = [];
  storagePets: [];
  storagePetsId: string;
  storagePetName: string;

  constructor(
    private modalController: ModalController,
    public alertController: AlertController,
    private storage: StorageCapService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getStorage();
  }

  async inputCustomPetValue() {
    console.log('Input async');
    const inputAlert = await this.alertController.create({
      header: 'Masukan nama hewan peliharaan mu:',
      inputs: [
        { type: 'text', placeholder: 'Nama' },
        { type: 'text', placeholder: 'Detail' },
      ],
      buttons: [
        { text: 'Cancel' },
        {
          text: 'Ok',
          handler: (valueNewPet) => {
            var indexLen = this.pets.length;
            var newId = 1 + indexLen;

            var dataBaru = {
              id: newId,
              name: valueNewPet[0],
              detail: valueNewPet[1],
            };

            console.log(this.pets);
            this.pets.push(dataBaru);
            this.storage.setObject('storagePets', {
              pets: this.pets,
            });
            this.getStorage();
          },
        },
      ],
    });
    console.log('Berhasil', inputAlert);
    await inputAlert.present();
  }

  getStorage() {
    this.storage.getObject('storagePets').then((data: any) => {
      this.storagePets = data['pets'];
      console.log('Isi :', this.storagePets);
    });
  }

  tapValue(event) {
    console.log('Hallo Console Log dari dismissModal', event);
    this.router.navigateByUrl('/transaction');
  }

  back() {
    this.router.navigateByUrl('/transaction');
  }
}
