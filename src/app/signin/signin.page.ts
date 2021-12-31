import { Component, OnInit } from '@angular/core';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { Platform, ToastController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import { Storage } from '@capacitor/storage';
import { StorageCapService } from '../../app/services/storage-cap.service';

// import * as JSONdata from "../../assets/data"; //You can name 'JSONdata' as you want

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  isWeb: boolean;
  apiUserinfo = null;
  apiUsername: string;
  apiEmail: string;
  apiID: string;
  apiImage: string;

  storageUsername: string;
  storageEmail: string;
  storageID: string;
  storageImage: string;
  storageKey: string;
  storageSc: string;
  storageUsers = [];
  storageProducts = [];
  storageProductNormal = [];
  storageProductDiskon = [];

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

    this.platform.backButton.subscribeWithPriority(10, () => {
      this.showToast('back button clicked');
    });
  }

  //_______ Onload Page _______________________________________________ Start ____________

  ionViewWillEnter() {
    this.clearVariable();
    this.clearStorage();
    // this.readJsonData();
  }
  ngOnInit() {}

  //_______ Onload Page _______________________________________________ End ____________

  //_______ Function Pembantu _______________________________________________ Start ____________

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

  clearStorage() {
    this.storage.clear();
  }

  clearVariable() {
    this.apiUserinfo = null;
    this.apiUsername = null;
    this.apiEmail = null;
    this.apiID = null;

    this.storageUsername = null;
    this.storageEmail = null;
    this.storageID = null;
    this.storageKey = null;
    this.storageSc = null;
  }

  //_______ Function Pembantu _______________________________________________ End ____________

  //_______ Load Local Storage _______________________________________________ Start ____________

  getStorage() {
    this.storage.getString('storageUsername').then((data: any) => {
      this.storageUsername = data.value;
      //console.log('Sekundren Username = ', this.storageUsername);
    });

    this.storage.getString('storageKey').then((data: any) => {
      this.storageKey = data.value;
      //console.log('Sekundren Key = ', this.storageKey);
    });
    this.storage.getString('storageSc').then((data: any) => {
      this.storageSc = data.value;
      //console.log('Sekundren Secret = ', this.storageSc);
    });
  }

  //_______ Load Local Storage _______________________________________________ End ____________

  //_______ login google _______________________________________________ Start ____________

  async onSignInGoogle() {
    let googleUser = await GoogleAuth.signIn();
    console.log('SIGNIN BERHASIL ---> Ini Isi GoogleUser = ', googleUser);
    this.apiUserinfo = googleUser;
    this.apiUsername =
      this.apiUserinfo.givenName + ' ' + this.apiUserinfo.familyName;
    this.apiEmail = this.apiUserinfo.email;
    this.apiID = this.apiUserinfo.id;
    this.apiImage = this.apiUserinfo.imageUrl;

    this.callServer(this.apiUserinfo);
  }

  // readJsonData(){    
  //   fetch("../../assets/data.json").then(res=>res.json()).then(json=>{
  //     this.storageAll = json;
  //     console.log("OUTPUT: ", this.storageAll);
  //       //DO YOUR STAFF
  //   });
  // }

  async callServer(apiUserinfo) {
    console.log('Pinging Server');
    var url = 'https://qalb.petpy.id/api/method/petpy.api.login';
    var headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    const params = new HttpParams({
      fromObject: {
        uid: 'SekundrenDay',
        id_token: apiUserinfo.authentication.idToken,
        //redirect_to: '/me',
      },
    });

    this.http.post(url, params, { headers }).subscribe(
      (response) => {
        console.log(' KONEKSI KE SERVER BERHASIL --> Data Log :', response);
        var a = response['message']['products'].length;
        var b = response['message']['products'];
        var c = response['message']['item_price'];
        // console.log('lenght a = ', a);
        //console.log('lenght a = ', response['message']);
        b.forEach((value) => {
          //console.log(value['item_code']
          var d =  c.filter(function(e) {
            return e.item_code == value['item_code']; 
            
          });

          console.log("D = ", d);

          for (let i = 0; i < d.length; i++) {
            const element = d[i];
            // console.log("Elemet = ", element);

            var dataProductDiskon = {
              item_code: value['item_code'],
              item_group: value['item_group'],
              item_name: value['item_name'],
              item_price: d[0]['price_list'],
              item_priceRate: d[0]['price_list_rate'],
              item_desc: value['description'],
            };

            this.storageProductDiskon.push(dataProductDiskon);
            this.storage.setObject('storageProductDiskon', {
              products: this.storageProductDiskon,
            });

            var dataProductNormal = {
              item_code: value['item_code'],
              item_group: value['item_group'],
              item_name: value['item_name'],
              item_price: d[1]['price_list'],
              item_priceRate: d[1]['price_list_rate'],
              item_desc: value['description'],
            };
            
            this.storageProductNormal.push(dataProductNormal);
            this.storage.setObject('storageProductNormal', {
              products: this.storageProductNormal,
            });

          }
          
          

          console.log("Normal = ", dataProductNormal)
          console.log("Diskon = ", dataProductDiskon);

        });

        this.storageUsername = this.apiUsername;
        this.storageEmail = this.apiEmail;
        this.storageID = this.apiID;
        this.storageImage = this.apiImage;
        this.storageKey = response['message']['api_key'];
        this.storageSc = response['message']['api_secret'];
        this.storageProducts = response['message']['products'];

        var dataUsers = {
          userID: this.storageID,
          userUsername: this.storageUsername,
          userEmail: this.storageEmail,
          userImage: this.storageImage,
          userApiKey: this.storageKey,
          userApiSc: this.storageSc,
        };
        this.storageUsers.push(dataUsers);
        this.storage.setObject('storageUsers', {
          User: this.storageUsers,
        });

        this.storage.setObject('storageProducts', {
          product: response['message']['products'],
        });

        // this.showAlert('Login Success ', this.storageUsername);
        // this.router.navigate(['/home']);
      },
      (error) => {
        console.log('ada Error', error);
        this.showAlert('ERROR', 'Proses Fail ');
      }
    );
  }

  //_______ login google _______________________________________________ End ____________

  //_______ login Facebook _______________________________________________ Start ____________

  onSignInFacebook() {
    this.showAlert('INFO', 'this feature will be ready soon');
  }

  //_______ login Facebook _______________________________________________ End ____________

  //_______ login Telp _______________________________________________ Start ____________

  onSignInTelp() {
    this.showAlert('INFO', 'this feature will be ready soon');
  }

  //_______ login Telp _______________________________________________ End ____________

  //_______ login Email _______________________________________________ Start ____________

  email: string = '';
  password: string = '';

  async onSignIn() {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, this.email, this.password)
      .then((userCredential) => {
        const user = userCredential.user;
        // console.log('user login = ', user.email);
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

  //_______ login Email _______________________________________________ End ____________
}
