import { Component, OnInit } from '@angular/core';
import { StorageCapService } from '../../app/services/storage-cap.service';
import { Router } from '@angular/router';

import {
  ModalController,
  AlertController,
  ToastController,
} from '@ionic/angular';

@Component({
  selector: 'app-transaction-selectpet',
  templateUrl: './transaction-selectpet.page.html',
  styleUrls: ['./transaction-selectpet.page.scss'],
})
export class TransactionSelectpetPage implements OnInit {
  constructor(
    public alertController: AlertController,
    private storage: StorageCapService,
    private router: Router,
    private toastController: ToastController
  ) {}

  // ______ LoadPage ______________________________________________________________ Start _______

  ionViewWillEnter() {
    // console.log(this.marker);
    this.storage.removeItem('storagePetPick');
    this.getStorage();
  }

  ngOnInit() {}

  // ______ LoadPage ______________________________________________________________ End _______

  // ______ LoadStorage ______________________________________________________________ Start _______

  jumlahArrayStorage: number;
  pickMenu: String;
  categoryPet: String;
  filterPet: String;

  getStorage() {
    this.storage.getObject('storageFilterPet').then((data: any) => {
      this.pickMenu = data.name;
      this.categoryPet = data.category;
      // console.log('Ngaco', this.categoryPet);
    });

    this.storage.getObject('storagePet').then((data: any) => {
      if (!data) {
        this.jumlahArrayStorage = 0;
        this.storageArrayPet = [];
        //console.log('jumlahArrayStorage kosong', this.jumlahArrayStorage);
      } else {
        if (this.categoryPet == 'kucing') {
          //console.log('Kucing');
          this.storageArrayPet = data['pets'];
          this.jumlahArrayStorage = this.storageArrayPet.length;
          this.storageFilterArrayPet = this.storageArrayPet.filter(function (
            storageArrayPet
          ) {
            return storageArrayPet.type == 'kucing';
          });
        } else if (this.categoryPet == 'anjing') {
          //console.log('Anjing');
          this.storageArrayPet = data['pets'];
          this.jumlahArrayStorage = this.storageArrayPet.length;
          this.storageFilterArrayPet = this.storageArrayPet.filter(function (
            storageArrayPet
          ) {
            return storageArrayPet.type == 'anjing';
          });
        }

        //console.log('jumlahArrayStorage isi', this.jumlahArrayStorage);
      }

      //console.log('jumlah Array Storage OnLoad :', this.jumlahArrayStorage);
    });
  }

  backPage() {
    this.router.navigateByUrl('/transaction-' + this.pickMenu);
  }

  // ______ LoadStorage ______________________________________________________________ End _______

  // ______ Show/Hide Form Input ____________________________________________________ Start _______

  isShowAP: boolean = false;

  showAP() {
    this.isShowAP = true;
    var z = document.getElementById('divList');
    z.style.marginTop = '350px';
  }
  hideAP() {
    this.isShowAP = false;
    var z = document.getElementById('divList');
    z.style.marginTop = '95px';
    this.newPetName = '';
    this.newPetType = '';
  }

  async showToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 5000,
    });
    toast.present();
  }

  // ______ Show/Hide Form Input ____________________________________________________ End _______

  // ______ Save New Pet __________________________________________________________ Start _______
  newPetName: String;
  newPetType: String;
  storageArrayPet = [];
  storageFilterArrayPet = [];
  pets = [];

  pickKucing() {
    this.newPetType = 'kucing';
    // console.log('pet type : ', this.newPetType);
  }
  pickAnjing() {
    this.newPetType = 'anjing';
    // console.log('pet type : ', this.newPetType);
  }

  saveNewPet() {
    // console.log('New Pet Name : ', this.newPetName);
    // console.log('New Pet Type : ', this.newPetType);

    var indexLen = this.pets.length;
    var newId = 1 + indexLen;
    var dataNewPet = {
      id: newId,
      name: this.newPetName,
      type: this.newPetType,
    };
    this.storageArrayPet.push(dataNewPet);
    //console.log('panjang data', this.storageArrayPet.length);
    this.storage.setObject('storagePet', {
      pets: this.storageArrayPet,
    });
    this.getStorage();

    if (this.categoryPet == this.newPetType) {
      console.log('Sesuai nih');
      this.storage.setObject('storagePetPick', {
        storagePetPickName: this.newPetName,
        storagePetPickType: this.newPetType,
      });
      this.showToast('new data saved!');
      this.hideAP();
      this.router.navigateByUrl('/transaction-' + this.pickMenu);
    } else {
      this.showToast(
        'new data saved! will appear in the appropriate category menu'
      );
      this.hideAP();
      this.router.navigateByUrl('/transaction-selectpet');
    }
  }

  // ______ Save New Pet __________________________________________________________ End _______

  // ______ PickPet __________________________________________________________ Start _______
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

    this.router.navigateByUrl('/transaction-' + this.pickMenu);
  }

  // ______ PickPet __________________________________________________________ End _______
}
