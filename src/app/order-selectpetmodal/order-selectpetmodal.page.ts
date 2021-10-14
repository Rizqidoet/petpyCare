import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-order-selectpetmodal',
  templateUrl: './order-selectpetmodal.page.html',
  styleUrls: ['./order-selectpetmodal.page.scss'],
})
export class OrderSelectpetmodalPage implements OnInit {
  constructor(
    private modalController: ModalController,
    public alertController: AlertController
  ) {}

  ngOnInit() {}

  pets = [];

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
            console.log(valueNewPet);

            this.pets.push(dataBaru);
          },
        },
      ],
    });
    console.log('Berhasil', inputAlert);
    await inputAlert.present();
  }

  tapValue() {
    console.log('Hallo Console Log dari dismissModal');
    this.modalController.dismiss();
  }

  dismissModal() {
    console.log('Hallo Console Log dari dismissModal');
    this.modalController.dismiss();
  }
}
