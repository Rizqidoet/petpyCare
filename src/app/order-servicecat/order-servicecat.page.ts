import { Component, OnInit } from '@angular/core';
import { Platform, ToastController, AlertController } from '@ionic/angular';
import { StorageCapService } from '../../app/services/storage-cap.service';
import { Storage } from '@capacitor/storage';


@Component({
  selector: 'app-order-servicecat',
  templateUrl: './order-servicecat.page.html',
  styleUrls: ['./order-servicecat.page.scss'],
})
export class OrderServicecatPage implements OnInit {
  apiProduct = {
    apiProductCode: '',
    apiProductName: '',
    apiProductGroup: '',
    apiProductDesc: '',
  };
  listProducts = [];
  userName: string;
  storageName: string;
  apiKey: string;
  apiSc: string;
  apiProductCode: string;
  apiProductName: string;
  apiProductGroup: string;
  apiProductDesc: string;

  constructor(
    
    private platform: Platform,
    public alertController: AlertController,
    private storage: StorageCapService
  ) { 

  }

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
    this.storage.getObject('apiProduct').then((data: any) => {
      this.apiProduct = data;
      this.listProducts = this.apiProduct['products'];
      console.log("Malakubdren = ", this.listProducts);
    });
    
  }

}
