import { Component, OnInit } from '@angular/core';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { Platform, ToastController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { StorageCapService } from '../../app/services/storage-cap.service';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(
    private platform: Platform,
    public alertController: AlertController,
    private router: Router,
    private storage: StorageCapService
  ) {}

  //_________ onload Page _______________________________________ Start _____________

  ionViewWillEnter() {
    this.getStorage();
  }

  ngOnInit() {}

  //_________ onload Page _______________________________________ End _____________

  //_________ Function Pembantu _______________________________________ Start _____________

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  clearVariable() {
    this.storageUsername = '';
    this.storageEmail = '';
    this.storageID = '';
    this.storageKey = '';
    this.storageSc = '';
  }

  //_________ Function Pembantu _______________________________________ End _____________

  //_________ load local storage _______________________________________ Start _____________

  storageUsername: string;
  storageEmail: string;
  storageID: string;
  storageImage: string;
  storageKey: string;
  storageSc: string;

  storageProduct = {
    storageProductCode: '',
    storageProductName: '',
    storageProductGroup: '',
    storageProductDesc: '',
  };

  listProducts = [];
  listGroup_1 = [];
  listGroup_2 = [];
  listGroup_3 = [];
  listGroup_4 = [];
  pickMenu_1: String;
  pickMenu_2: String;
  pickMenu_3: String;
  pickMenu_4: String;

  getStorage() {
    this.storage.getObject('storageUsers').then((data: any) => {
      this.storageUsername = data['User'][0]['userUsername'];
      this.storageEmail = data['User'][0]['userEmail'];
      this.storageImage = data['User'][0]['userImage'];
      //console.log('Sekundren  = ', data['User'][0]);
      // this.showAlert('Your email is => ', this.storageEmail);
    });

    this.storage.getObject('storageProductNormal').then((data: any) => {
      this.storageProduct = data;
      console.log('Array Product = ', this.storageProduct);
      var a = this.storageProduct['products'].filter(function (storageProduct) {
        return storageProduct.item_group == 'Grooming Kucing';
      });

      var b = this.storageProduct['products'].filter(function (storageProduct) {
        return storageProduct.item_group == 'Haircut Kucing';
      });

      var c = this.storageProduct['products'].filter(function (storageProduct) {
        return storageProduct.item_group == 'Grooming Anjing';
      });

      var d = this.storageProduct['products'].filter(function (storageProduct) {
        return storageProduct.item_group == 'Haircut Anjing';
      });
      this.pickMenu_1 = a[0]['item_group'];
      this.pickMenu_2 = b[0]['item_group'];
      this.pickMenu_3 = c[0]['item_group'];
      this.pickMenu_4 = d[0]['item_group'];
      console.log(
        'List groupName = ',
        this.listGroup_1,
        ' - ' + this.listGroup_2,
        ' - ' + this.listGroup_3,
        ' - ' + this.listGroup_4
      );
    });
  }

  //_________ load local storage _______________________________________ End _____________

  //_________ RouterLink _______________________________________ Start _____________

  categoryPet: String;
  arrayFilterPet = [];

  dynamicMenu(value: string) {
    this.storage.removeItem('storageAddressPick');
    this.storage.removeItem('storagePetPick');
    //Storage.set({ key: 'storagePickMenu', value: value });

    if (value == 'haircut-kucing') {
      this.categoryPet = 'kucing';
      console.log('the value is', value);
      console.log('the category is', this.categoryPet);

      if (this.arrayFilterPet.length > 0) {
        this.arrayFilterPet.length = 0;
      }
      var indexLen = this.arrayFilterPet.length;
      var newId = 1 + indexLen;
      this.storage.setObject('storageFilterPet', {
        id: newId,
        name: value,
        category: 'kucing',
      });
    } else if (value == 'grooming-kucing') {
      this.categoryPet = 'kucing';
      console.log('the value is', value);
      console.log('the category is', this.categoryPet);

      if (this.arrayFilterPet.length > 0) {
        this.arrayFilterPet.length = 0;
      }
      var indexLen = this.arrayFilterPet.length;
      var newId = 1 + indexLen;
      this.storage.setObject('storageFilterPet', {
        id: newId,
        name: value,
        category: 'kucing',
      });
    } else if (value == 'grooming-anjing') {
      this.categoryPet = 'anjing';
      console.log('the value is', value);
      console.log('the category is', this.categoryPet);

      if (this.arrayFilterPet.length > 0) {
        this.arrayFilterPet.length = 0;
      }
      var indexLen = this.arrayFilterPet.length;
      var newId = 1 + indexLen;
      this.storage.setObject('storageFilterPet', {
        id: newId,
        name: value,
        category: 'anjing',
      });
    } else if (value == 'haircut-anjing') {
      this.categoryPet = 'anjing';
      console.log('the value is', value);
      console.log('the category is', this.categoryPet);

      if (this.arrayFilterPet.length > 0) {
        this.arrayFilterPet.length = 0;
      }
      var indexLen = this.arrayFilterPet.length;
      var newId = 1 + indexLen;
      this.storage.setObject('storageFilterPet', {
        id: newId,
        name: value,
        category: 'anjing',
      });
    }
    this.router.navigateByUrl('/transaction-' + value);

    //console.log(value);
  }
  //_________ RouterLink _______________________________________ End _____________

  //_________ Sign out _______________________________________ Start _____________

  OnSignout() {
    this.storage.clear();
    GoogleAuth.signOut();
    this.clearVariable();
    this.router.navigateByUrl('/signin');
  }

  //_________ Sign out _______________________________________ End _____________
}
