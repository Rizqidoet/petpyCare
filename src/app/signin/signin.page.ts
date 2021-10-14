import { Component } from '@angular/core';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import {
  Platform,
  ToastController,
  IonList,
  AlertController,
} from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError, retry } from 'rxjs/operators';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Item, StorageService } from '../services/storage.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage {
  items: Item[] = [];

  newItem: Item = <Item>{};

  isWeb: boolean;

  constructor(
    private platform: Platform,
    public alertController: AlertController,
    private router: Router,
    private http: HttpClient,
    private storageService: StorageService,
    private toastController: ToastController,
    private storage: Storage
  ) {
    this.isWeb = !this.platform.is('android') && !this.platform.is('ios');

    if (this.isWeb) {
      GoogleAuth.init();
      console.log('Is Web Platform :', this.isWeb);
    } else {
      console.log('Is Web Platform :', this.isWeb);
    }
    this.platform.ready().then(() => {
      this.loadItems();
    });
  }
  //_______________________________________________________________________________________
  async ngOnInit() {
    // If using a custom driver:
    // await this.storage.defineDriver(MyCustomDriver)
    await this.storage.create();
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
  async refreshToken() {
    let response = await GoogleAuth.refresh();
    console.log('refresh:', response);
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

  userInfo = null;

  async onSignInGoogle() {
    let googleUser = await GoogleAuth.signIn();
    console.log('SIGNIN BERHASIL ---> Ini Isi GoogleUser = ', googleUser);
    this.userInfo = googleUser;
    this.signupReg(this.userInfo);
  }

  //_______________________________________________________________________________________
  apiKey = null;
  apiSc = null;

  async signupReg(userInfo) {
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
    console.log(
      'KONEKSI KE SERVER BERHASIL ---> Ini Isi Body API nya = ',
      params
    );

    this.http.post(url, params, { headers }).subscribe(
      (response) => {
        console.log('Data Log :', response);
        this.apiKey = response['message']['api_key'];
        this.apiSc = response['message']['api_secret'];
        this.addItem(this.apiKey, this.apiSc);
        this.showToast('Login Success, welcome ' + response['full_name']);
        //this.router.navigateByUrl('/home');
      },
      (error) => {
        console.log('Ene Error', error);
        this.showAlert('ERROR', 'Proses Fail ');
      }
    );
  }

  //_______________________________________________________________________________________

  addItem(apiKey, apiSc) {
    this.newItem.apiKey = apiKey;
    this.newItem.apiSc = apiSc;

    this.storageService.addItem(this.newItem).then((item) => {
      this.newItem = <Item>{};
      this.loadItems();
    });
  }

  loadItems() {
    this.storageService.getItems().then((items) => {
      this.items = items;
    });
  }

  async showToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
    });
    toast.present();
  }

  onSignInFacebook() {
    this.showAlert('INFO', 'this feature will be ready soon');
  }

  //_______________________________________________________________________________________
  onSignInTelp() {
    this.showAlert('INFO', 'this feature will be ready soon');
  }
}
