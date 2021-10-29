import { Component, OnInit } from '@angular/core';
import { Platform, ToastController, AlertController } from '@ionic/angular';
import { StorageCapService } from '../../app/services/storage-cap.service';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-order-servicedog',
  templateUrl: './order-servicedog.page.html',
  styleUrls: ['./order-servicedog.page.scss'],
})
export class OrderServicedogPage implements OnInit {
  storageUsername: string;
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
  listProducts_dog = [];

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
      this.listProducts_dog = this.storageProduct['products'].filter(function (
        storageProduct
      ) {
        return storageProduct.item_group == 'Service Anjing';
      });
      console.log('Sekundren - 2 = ', this.listProducts_dog);
    });
  }
}
