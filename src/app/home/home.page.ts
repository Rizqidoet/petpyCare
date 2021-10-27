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
  apiProduct = {
    apiProductCode: '',
    apiProductName: '',
    apiProductGroup: '',
    apiProductDesc: '',
  };
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
    private router: Router,
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

  ngOnInit() {
    this.getStorage();
  }
  getStorage() {
    this.storage.getString('userName').then((data: any) => {
      if (data.value) {
        this.userName = data.value;
      }
    });
    this.storage.getString('apiKey').then((data: any) => {
      if (data.value) {
        this.apiKey = data.value;
      }
    });
    this.storage.getString('apiSc').then((data: any) => {
      if (data.value) {
        this.apiSc = data.value;
      }
    });
  }

  // async getDataLS(dataKey) {
  //   const { value } = await Storage.get({ key: dataKey });
  //   if (dataKey === 'apiKey') {
  //     this.apiKey = value;
  //   } else if (dataKey === 'apiSc') {
  //     this.apiSc = value;
  //   } else if (dataKey === 'apiPd') {
  //     this.apiPd = value;
  //   } else if (dataKey === 'userName') {
  //     this.userName = value;
  //   }
  // }

  clearStorage() {
    this.storage.clear();
    this.router.navigateByUrl('/signin');
  }
}
