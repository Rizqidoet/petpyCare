import { Component } from '@angular/core';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { Item, StorageService } from '../services/storage.service';
import { Storage } from '@ionic/storage-angular';
import { Platform, ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(
    private storage: Storage,
    private storageService: StorageService,
    private platform: Platform,
    public alertController: AlertController
  ) {
    this.platform.ready().then(() => {
      this.loadItems();
    });
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
    // If using a custom driver:
    // await this.storage.defineDriver(MyCustomDriver)
    await this.storage.create();
  }

  items: Item[] = [];

  loadItems() {
    this.storageService.getItems().then((items) => {
      this.items = items;
    });
  }

  cekidot() {
    this.loadItems();
    console.log('klik', this.items['0']['apiPd']);
    var a = this.items['0']['apiPd'];
    var ab = a['10'];
    console.log(ab);

    this.showAlert('Login Success', 'Api Product Ke 10 =  ' + ab['item_code']);
  }

  async onSignOut() {
    await GoogleAuth.signOut();
    //this.username = "";
  }
}
