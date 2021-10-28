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
  storageKey: string;
  storageSc: string;

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
      this.showAlert('Your email is => ', this.storageEmail);
    });

    this.storage.getString('storageID').then((data: any) => {
      this.storageID = data.value;
      console.log('Sekundren ID = ', this.storageID);
      this.showAlert('Your ID is => ', this.storageID);
    });
    this.storage.getString('storageUsername').then((data: any) => {
      this.storageUsername = data.value;
      console.log('Sekundren Username = ', this.storageUsername);
      this.showAlert('Your Username is => ', this.storageUsername);
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
