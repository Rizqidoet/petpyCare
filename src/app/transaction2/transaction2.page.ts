import { Component, OnInit, ViewChild } from '@angular/core';
import { StorageCapService } from '../../app/services/storage-cap.service';
import { Platform, ToastController, AlertController } from '@ionic/angular';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-transaction2',
  templateUrl: './transaction2.page.html',
  styleUrls: ['./transaction2.page.scss'],
})
export class Transaction2Page implements OnInit {
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
        return storageProduct.item_group == 'Service Anjing';
      });
      console.log('Sekundren - 2 = ', this.listProducts_cat);
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
}
