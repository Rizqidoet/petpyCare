import { Component, OnInit } from '@angular/core';
import { Item, StorageService } from '../services/storage.service';
import { Storage } from '@ionic/storage-angular';
import { Platform, ToastController, AlertController } from '@ionic/angular';


@Component({
  selector: 'app-order-servicecat',
  templateUrl: './order-servicecat.page.html',
  styleUrls: ['./order-servicecat.page.scss'],
})
export class OrderServicecatPage implements OnInit {
  items: Item[] = [];
  listProducts = null;
  

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
    await this.storage.create();
    this.loadItems();
  }

  loadItems() {
    this.storageService.getItems().then((items) => {
      this.items = items;
    });
  }
  cekidot() {
    this.loadItems();
    //console.log('klik', this.items['0']['apiPd']);
    this.listProducts = this.items['0']['apiPd'];
    var listCat = this.listProducts ['item_group'];
    console.log("Iyaaa ", this.listProducts);
    console.log("Iyaaa ", listCat);

  }

}
