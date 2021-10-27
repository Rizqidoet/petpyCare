import { Component, OnInit } from '@angular/core';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { Platform, ToastController, AlertController } from '@ionic/angular';
import { Storage } from '@capacitor/storage';
import { Router } from '@angular/router';
import { StorageCapService } from '../../app/services/storage-cap.service';

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

  async logOff() {
    console.log('Signout ...');
    await GoogleAuth.signOut;
    this.removeDataLS('apiKey', this.apiKey);
    this.removeDataLS('apiSc', this.apiSc);
    //this.removeDataLS('apiPd', this.apiPd);
    this.removeDataLS('userName', this.userName);
    this.router.navigateByUrl('/signin');
    //this.username = "";
  }

  async removeDataLS(dataKey, dataValue) {
    await Storage.remove({
      key: dataKey,
    });
  }
}
