import { Component } from '@angular/core';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { Platform, ToastController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage {
  isWeb: boolean;

  constructor(
    private platform: Platform,
    public alertController: AlertController,
    private router: Router,
    private http: HttpClient,
    private toastController: ToastController,
  ) {
    this.isWeb = !this.platform.is('android') && !this.platform.is('ios');
    if (this.isWeb) {
      GoogleAuth.init();
      console.log('Is Web Platform :', this.isWeb);
    } else {
      console.log('Is Web Platform :', this.isWeb);
    }

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

  async showToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
    });
    toast.present();
  }

  async refreshToken() {
    let response = await GoogleAuth.refresh();
    console.log('refresh:', response);
  }

  //_______________________________________________________________________________________

  userInfo = null;

  async onSignInGoogle() {
    let googleUser = await GoogleAuth.signIn();
    console.log('SIGNIN BERHASIL ---> Ini Isi GoogleUser = ', googleUser);
    this.userInfo = googleUser;

    this.callServer(this.userInfo);
  }

  //_______________________________________________________________________________________
  apiKey = null;
  apiSc = null;
  apiPd = [];
  userName = null;

  async callServer(userInfo) {
    console.log('Pinging Server');
    var url = 'https://qalb.petpy.id/api/method/petpy.api.login';
    var headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    const params = new HttpParams({
      fromObject: {
        uid: 'SekundrenDay',
        id_token: userInfo.authentication.idToken,
        //redirect_to: '/me',
      },
    });
    

    this.http.post(url, params, { headers }).subscribe(
      (response) => {
        console.log(' KONEKSI KE SERVER BERHASIL --> Data Log :', response);
        this.apiKey = response['message']['api_key'];
        this.apiSc = response['message']['api_secret'];
        this.apiPd = response['message']['products'];
        this.userName = response['full_name'];

        const a = this.apiPd.length;
        console.log(this.apiPd,a);

        for (let i = 0; i <= this.apiPd.length; i++) {

          console.log("Detail Product Ke", i + "---->");
          const apiPd_itemCode = this.apiPd[i]['item_code'];
          const apiPd_itemName = this.apiPd[i]['item_name'];
          const apiPd_itemGroup= this.apiPd[i]['item_group'];
          const apiPd_description = this.apiPd[i]['description'];

          console.log(apiPd_itemCode);
          console.log(apiPd_itemName);
          console.log(apiPd_itemGroup);
          console.log(apiPd_description);
          
        }

        // this.setDataLS("apiKey",this.apiKey);
        // this.setDataLS("apiSc",this.apiSc);
        // this.setDataLS("apiPd",this.apiPd);
        // this.setDataLS("userName", this.userName);
        // this.showToast('Login Success, welcome ' + response['full_name']);
        // this.router.navigateByUrl('/home');
      },
      (error) => {
        console.log('Ene Error', error);
        this.showAlert('ERROR', 'Proses Fail ');
      }
    );
  }

  async setDataLS(dataKey,dataValue){
    console.log("saving a data...");
    
    const apiPd = JSON.stringify;
    await Storage.set({
      key: dataKey,
      value: dataValue,
    });
  }

  //_______________________________________________________________________________________

  

  //_______________________________________________________________________________________

  onSignInFacebook() {
    this.showAlert('INFO', 'this feature will be ready soon');
  }

  //_______________________________________________________________________________________

  onSignInTelp() {
    this.showAlert('INFO', 'this feature will be ready soon');
  }

  //_______________________________________________________________________________________
  email: string = '';
  password: string = '';

  async onSignIn() {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, this.email, this.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('user login = ', user.email);
        this.email = '';
        this.password = '';
        this.router.navigateByUrl('/home');
        this.showAlert('Login Success', 'Welcome ' + user.email);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(
          'Username Atau Password Salah, Periksa Kembali!',
          'Code :',
          error.code,
          'message :',
          error.message
        );

        var errMsg = '';
        if (errorCode === 'auth/invalid-email') {
          errMsg = 'email does not match!';
          console.log(errMsg);
          this.showAlert('Login Error', errMsg);
        } else if (errorCode === 'auth/wrong-password') {
          errMsg = 'Wrong Password!';
          console.log(errMsg);
          this.showAlert('Login Error', errMsg);
        } else if (errorCode === 'auth/user-not-found') {
          errMsg = 'email not registered!';
          console.log(errMsg);
          this.showAlert('Login Error', errMsg);
        } else if (errorCode === 'auth/internal-error') {
          errMsg = 'password cannot be empty!';
          console.log(errMsg);
          this.showAlert('Login Error', errMsg);
        } else {
          errMsg = 'Internal Error! please restart this Apps';
          console.log(errMsg);
          this.showAlert('Login Error', errMsg);
        }
      });
  }

  //_______________________________________________________________________________________  
}
