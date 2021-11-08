import { Component, OnInit, ViewChild } from '@angular/core';
import { StorageCapService } from '../../app/services/storage-cap.service';
import { Platform, ToastController, AlertController } from '@ionic/angular';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.page.html',
  styleUrls: ['./transaction.page.scss'],
})
export class TransactionPage implements OnInit {
  @ViewChild('mySlider') slides: IonSlides;

  storageProduct = {
    storageProductCode: '',
    storageProductName: '',
    storageProductGroup: '',
    storageProductDesc: '',
  };
  storageProductCode: string;
  storageProductName: string;
  storageProductGroup: string;
  storageProductDesc: string;

  listProducts = [];
  listProducts_cat = [];
  pets = [];
  pet: string;
  addressHome: string;
  addressDelivery: string;

  transactions = [];
  transaction_name: string;
  transaction_email: string;
  transaction_phone: string;
  transaction_address: string;
  transaction_petname: string;
  transaction_petdetail: string;
  transaction_date: string;
  transaction_service: string;
  transaction_package: string;
  transaction_payment: string;
  transaction_totalamount: string;

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

  constructor(
    private platform: Platform,
    public alertController: AlertController,
    private storage: StorageCapService
  ) {}

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  async ngOnInit() {
    this.getStorage();
  }

  getStorage() {
    this.storage.getObject('storageProduct').then((data: any) => {
      this.storageProduct = data;
      console.log('Sekundren - 1 = ', this.storageProduct);
      this.listProducts_cat = this.storageProduct['products'].filter(function (
        storageProduct
      ) {
        return storageProduct.item_group == 'Services';
      });
      console.log('Sekundren - 2 = ', this.storageProduct);
    });

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

    this.storage.getString('storageUsername').then((data: any) => {
      this.transaction_name = data.value;
    });

    this.storage.getString('storageEmail').then((data: any) => {
      this.transaction_email = data.value;
    });
  }

  slideOpts = {
    initialSlide: 0,
    speed: 400,
  };

  swipeNext() {
    this.slides.slideNext();
  }

  swipePrev() {
    this.slides.slidePrev();
  }

  Sekundren(event) {
    this.transaction_service = event.detail['value'];
    console.log('radioGroupChange', this.transaction_service);
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
            console.log(valueNewPet[0]);
            this.pet = valueNewPet[0];
            this.pets.push(dataBaru);
            console.log('Berhasil', this.pet);
          },
        },
      ],
    });

    await inputAlert.present();
  }

  async inputCustomAddressHomeValue() {
    console.log('Input async');
    const inputAlert = await this.alertController.create({
      header: 'Your address:',
      inputs: [{ type: 'text', placeholder: 'address' }],
      buttons: [
        { text: 'Cancel' },
        {
          text: 'Ok',
          handler: (valueNewaddressHome) => {
            // var indexLen = this.pets.length;
            // var newId = 1 + indexLen;
            var dataBaru = {
              // id: newId,
              name: valueNewaddressHome,
            };
            console.log(valueNewaddressHome);
            this.addressHome = valueNewaddressHome[0];
            //this.pets.push(dataBaru);
            console.log('Berhasil', this.addressHome);
          },
        },
      ],
    });

    await inputAlert.present();
  }

  async inputCustomAddressDeliveryValue() {
    console.log('Input async');
    const inputAlert = await this.alertController.create({
      header: 'Your address:',
      inputs: [{ type: 'text', placeholder: 'address' }],
      buttons: [
        { text: 'Cancel' },
        {
          text: 'Ok',
          handler: (valueNewaddressDelivery) => {
            // var indexLen = this.pets.length;
            // var newId = 1 + indexLen;
            var dataBaru = {
              // id: newId,
              name: valueNewaddressDelivery,
            };
            console.log(valueNewaddressDelivery);
            this.addressDelivery = valueNewaddressDelivery[0];
            //this.pets.push(dataBaru);
            console.log('Berhasil', this.addressDelivery);
          },
        },
      ],
    });

    await inputAlert.present();
  }

  SekundrenLagi() {
    console.log('Transaction Name', this.transaction_name);
    console.log('Transaction email', this.transaction_email);
    // console.log('Transaction phone', this.transaction_Transaction);
    // console.log('Transaction address', this.transaction_Transaction);
    // console.log('Transaction petname', this.transaction_Transaction);
    // console.log('Transaction petdetail', this.transaction_Transaction);
    // console.log('Transaction date', this.transaction_Transaction);
    console.log('Transaction service', this.transaction_service);
    // console.log('Transaction package', this.transaction_service);

    var indexLen = this.pets.length;
    var newId = 1 + indexLen;
    var dataTransaction = {
      id: newId,
      name: this.transaction_name,
      email: this.transaction_email,
      service: this.transaction_service,
    };
    this.transactions.push(dataTransaction);
    this.storage.setObject('storageTransactions', {
      transactions: this.transactions,
    });
    this.getStorage();
    this.swipeNext();
  }
}
