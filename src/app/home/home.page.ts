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
  storageProductCode: string;
  storageProductName: string;
  storageProductGroup: string;
  storageProductDesc: string;
  listProducts = [];
  listGroup_1 = [];
  listGroup_2 = [];
  listGroup_3 = [];
  listGroup_4 = [];

  constructor(
    private platform: Platform,
    public alertController: AlertController,
    private router: Router,
    private storage: StorageCapService
  ) {}

  ngOnInit() {
    this.getStorage();
  }

  //_______________________________________________________________________________________

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  //_______________________________________________________________________________________

  getStorage() {
    this.storage.getString('storageEmail').then((data: any) => {
      this.storageEmail = data.value;
      console.log('Sekundren Email = ', this.storageEmail);
      // this.showAlert('Your email is => ', this.storageEmail);
    });

    this.storage.getString('storageID').then((data: any) => {
      this.storageID = data.value;
      console.log('Sekundren ID = ', this.storageID);
      // this.showAlert('Your ID is => ', this.storageID);
    });

    this.storage.getString('storageImage').then((data: any) => {
      this.storageImage = data.value;
      console.log('Sekundren Image = ', this.storageImage);
      // this.showAlert('Your ID is => ', this.storageID);
    });

    this.storage.getString('storageUsername').then((data: any) => {
      this.storageUsername = data.value;
      console.log('Sekundren Username = ', this.storageUsername);
      // this.showAlert('Your Username is => ', this.storageUsername);
    });

    this.storage.getObject('storageProduct').then((data: any) => {
      this.storageProduct = data;
      console.log('Sekundren - 1 = ', this.storageProduct);
      var a = this.storageProduct['products'].filter(function (storageProduct) {
        return storageProduct.item_group == 'Cukur Kucing';
      });

      var b = this.storageProduct['products'].filter(function (storageProduct) {
        return storageProduct.item_group == 'Service Cat';
      });

      var c = this.storageProduct['products'].filter(function (storageProduct) {
        return storageProduct.item_group == 'Service Anjing';
      });

      var d = this.storageProduct['products'].filter(function (storageProduct) {
        return storageProduct.item_group == 'Service Anjing Haircut';
      });
      this.listGroup_1 = a[0]['item_group'];
      this.listGroup_2 = b[0]['item_group'];
      this.listGroup_3 = c[0]['item_group'];
      this.listGroup_4 = d[0]['item_group'];
      console.log(
        'Sekundren - 2 = ',
        this.listGroup_1,
        this.listGroup_2,
        this.listGroup_3,
        this.listGroup_4
      );
    });
  }

  //_______________________________________________________________________________________

  OnSignout() {
    this.storage.clear();
    GoogleAuth.signOut();
    this.clearVariable();
    this.router.navigateByUrl('/signin');
  }

  //_______________________________________________________________________________________

  clearVariable() {
    this.storageUsername = '';
    this.storageEmail = '';
    this.storageID = '';
    this.storageKey = '';
    this.storageSc = '';
  }

  //_______________________________________________________________________________________
}
