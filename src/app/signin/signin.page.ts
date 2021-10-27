import { Component } from '@angular/core';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { Platform, ToastController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import { Storage } from '@capacitor/storage';
import { StorageCapService } from '../../app/services/storage-cap.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage {
  isWeb: boolean;
  userInfo = null;
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
    private http: HttpClient,
    private toastController: ToastController,
    private storage: StorageCapService
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

  async onSignInGoogle() {
    let googleUser = await GoogleAuth.signIn();
    console.log('SIGNIN BERHASIL ---> Ini Isi GoogleUser = ', googleUser);
    this.userInfo = googleUser;

    this.callServer(this.userInfo);
  }

  //_______________________________________________________________________________________

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
        var a = response['message']['products'].length;
        console.log('lenght a = ', a);

          this.userName = response['full_name'];
          this.apiKey = response['message']['api_key'];
          this.apiSc = response['message']['api_secret'];
          this.storage.setString('userName', this.userName);
          this.storage.setString('apiKey', this.apiKey);
          this.storage.setString('apiSc', this.apiSc);
          this.storage.setObject('apiProduct', {
            products : response['message']['products']
          });
        this.router.navigate(['/home']);
      },
      (error) => {
        console.log('Ene Error', error);
        this.showAlert('ERROR', 'Proses Fail ');
      }
    );
  }

  setDataLS(
    userName,
    apiKey,
    apiSc,
    apiProductCode,
    apiProductName,
    apiProductGroup,
    apiProductDesc
  ) {
    this.storage.setString('userName', this.userName);
    this.storage.setString('apiKey', this.apiKey);
    this.storage.setString('apiSc', this.apiSc);
    this.storage.setObject('apiProduct', {
      apiProductCode: this.apiProductCode,
      apiProductName: this.apiProductName,
      apiProductGroup: this.apiProductGroup,
      apiProductDesc: this.apiProductDesc,
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
