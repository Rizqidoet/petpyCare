import { Component } from '@angular/core';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { Platform, ToastController, AlertController } from '@ionic/angular';
import { Storage } from '@capacitor/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})


export class HomePage {

  apiKey = null;
  apiSc = null;
  apiPd = null;
  userName = null;

  constructor(
    private platform: Platform,
    public alertController: AlertController,
    private router: Router,
  ) {

    this.getDataLS("apiKey");
    this.getDataLS("apiSc");
    this.getDataLS("apiPd");
    this.getDataLS("userName");
  }
  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  
  async getDataLS(dataKey){
    const { value } = await Storage.get({ key: dataKey });
    if(dataKey==="apiKey"){
      this.apiKey = value;
    }else if(dataKey==="apiSc"){
      this.apiSc = value;
    }else if(dataKey==="apiPd"){
      this.apiPd = value;
    }else if(dataKey==="userName"){
      this.userName = value;
    }
  }

  async logOff() {
    console.log("Signout ...");
    await GoogleAuth.signOut;
    this.removeDataLS("apiKey",this.apiKey);
    this.removeDataLS("apiSc",this.apiSc);
    this.removeDataLS("apiPd",this.apiPd);
    this.removeDataLS("userName", this.userName);
    this.router.navigateByUrl('/signin');
    //this.username = "";
  }

  async removeDataLS(dataKey,dataValue){
    await Storage.remove({ 
      key: dataKey,
    });
  };
}
