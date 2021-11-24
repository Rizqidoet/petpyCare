import { Component, OnInit, ViewChild } from '@angular/core';
import { StorageCapService } from '../../app/services/storage-cap.service';
import { Platform, ToastController, AlertController } from '@ionic/angular';
import { IonSlides } from '@ionic/angular';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-transaction-service-cat',
  templateUrl: './transaction-service-cat.page.html',
  styleUrls: ['./transaction-service-cat.page.scss'],
})
export class TransactionServiceCatPage implements OnInit {
  @ViewChild('mySlider') slides: IonSlides;
  constructor(
    private platform: Platform,
    public alertController: AlertController,
    private storage: StorageCapService,
    private router: Router
  ) {}

  // ______ Function On Load Page _____________________________________________________ Start __________

  async ngOnInit() {}

  ionViewWillEnter() {
    this.getStorage1();
    this.getStorage2();
    this.getStorage3();
  }

  // ______ Function On Load Page _____________________________________________________ End ______________

  // ______Function Pendukung___________________________________________________________Start_________

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });

    await alert.present();
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

  defaultForm() {
    this.pickPackage = '';
    this.pickService = '';
    this.pickAddressAddress = 'Set Address';
    this.pickAddressName = '';
    this.pickAddressPhone = '';
    this.pickPetName = '- set pet';
    this.pickPetType = '';
    this.pickPetDate = '';
    this.pickPetTime = '';
  }

  closePage() {
    this.defaultForm();
    this.storage.removeItem('storageFilterPet');
    this.router.navigateByUrl('/home');
  }

  // ______Function Pendukung___________________________________________________________End_________

  // ______Slide_1______________________________________________________________Start_______

  listProducts_category = [];
  storageProduct = [];
  pickPackage: string;
  pickUsername: string;
  pickEmail: string;

  getStorage1() {
    this.storage.getObject('storageProducts').then((data: any) => {
      this.storageProduct = data;
      this.listProducts_category = this.storageProduct['product'].filter(
        function (storageProduct) {
          return storageProduct.item_group == 'Service Cat';
        }
      );
      // console.log('Array Product Cukur Kucing = ', this.listProducts_category);
    });

    this.storage.getObject('storageUsers').then((data: any) => {
      this.pickUsername = data['User'][0]['userUsername'];
      this.pickEmail = data['User'][0]['userEmail'];
      //console.log('Sekundren  = ', this.pickUsername);
    });
  }

  taplistProduct(listproduct) {
    //this.storage.removeItem('pickAddress');

    //console.log('Detail Listproduct :', listproduct);
    this.pickPackage = listproduct['item_name'];

    this.swipeNext();
  }

  // ______Slide_1______________________________________________________________End_______

  // ______ Slide 2 ______________________________________________________________ Start _______

  pickService: string;
  pickAddressAddress: string;
  pickAddressName: string;
  pickAddressPhone: string;
  pickAddressAddress2: string;
  pickAddressName2: string;
  pickAddressPhone2: string;
  isShownCS: boolean = false;
  isShownHS: boolean = false;
  isShownDS: boolean = false;

  enabledCS() {
    // console.log('Clinic Service Clicked');
    this.pickService = 'OnClinic';
    this.pickAddressAddress2 = 'Jl. Bukit duri salatan RT 8 RW 03 no 87';
    this.pickAddressName2 = 'Clinic';
    this.pickAddressPhone2 = '081280675738';
    //console.log('varibale service = :', this.pickService);
    //console.log('varibale address address :', this.pickAddressAddress2);
    //console.log('varibale address name :', this.pickAddressName2);
    //console.log('varibale address phone = :', this.pickAddressPhone2);

    this.isShownCS = true;
    this.isShownHS = false;
    this.isShownDS = false;

    var z = document.getElementById('btnSlide2');
    z.style.marginTop = '135px';
  }

  enabledHS() {
    // console.log('Home Service Clicked');
    this.pickService = 'HomeService';
    //console.log('varibale service = :', this.pickService);

    this.isShownCS = false;
    this.isShownHS = true;
    this.isShownDS = false;

    // console.log('Status DS :', this.isShownDS);
    var z = document.getElementById('btnSlide2');
    if (this.pickAddressAddress == 'Set Address') {
      // console.log('Kosong');
      z.style.marginTop = '97px';
    } else {
      // console.log('Isi');
      z.style.marginTop = '42px';
    }
  }

  enabledDS() {
    // console.log('Delivery Service Clicked');
    this.pickService = 'DeliveryService';
    //console.log('varibale service = :', this.pickService);
    this.isShownCS = false;
    this.isShownHS = false;
    this.isShownDS = true;

    // console.log('Status DS :', this.isShownDS);
    var z = document.getElementById('btnSlide2');
    if (this.pickAddressAddress == 'Set Address') {
      // console.log('Kosong');
      z.style.marginTop = '90px';
    } else {
      // console.log('Isi');
      z.style.marginTop = '37px';
    }
  }

  selectAddress() {
    this.storage.removeItem('storageAddressPick');
    this.router.navigateByUrl('/transaction-selectaddress');
  }

  getStorage2() {
    this.storage.getObject('storageAddressPick').then((data: any) => {
      if (!data) {
        this.pickAddressAddress = 'Set Address';
      } else {
        this.pickAddressAddress = data['storageAddressPickAddress'];
        this.pickAddressName = data['storageAddressPickName'];
        this.pickAddressPhone = data['storageAddressPickPhone'];
      }

      console.log('variabel address address :', this.pickAddressAddress);
      console.log('variabel address name :', this.pickAddressName);
      console.log('variabel address phone :', this.pickAddressPhone);
    });
  }

  // ______ Slide 2 ______________________________________________________________ End _______

  // ______ Slide 3 ______________________________________________________________ Start _______

  pickPetName: string;
  pickPetType: string;
  pickPetDate: string;
  pickPetTime: string;
  pets = [];
  transactions = [];

  getStorage3() {
    this.storage.getObject('storagePetPick').then((data: any) => {
      if (!data) {
        this.pickPetName = '- set pet';
      } else {
        this.pickPetName = data['storagePetPickName'];
        this.pickPetType = data['storagePetPickType'];
      }

      //console.log('variabel petpick name :', this.pickPetName);
      //console.log('variabel petpick type :', this.pickPetType);
    });
  }

  setDate(date) {
    this.pickPetDate = moment(date).format('MMM DD YYYY');
    //console.log('date', this.pickPetDate);
  }

  setTime(time) {
    this.pickPetTime = moment(time).format('HH:mm');
    //console.log('time', this.pickPetTime);
  }

  async onSaveTransaction() {
    // console.log('Package : ', this.pickPackage);
    // console.log('Service : ', this.pickService);
    if (this.pickPackage == '' || !this.pickPackage) {
      this.showAlert('Warning', 'Package Kosong ' + this.pickPackage);
    } else {
      if (this.pickService == '') {
        this.showAlert('Warning', 'Service Kosong ' + this.pickService);
      } else if (this.pickService == 'OnClinic') {
        if (this.pickPetName == '- set pet') {
          this.showAlert('Warning', 'Petname Kosong ' + this.pickPetName);
        } else {
          if (this.pickPetDate == '') {
            this.showAlert('Warning', 'Date Kosong ' + this.pickPetDate);
          } else {
            if (this.pickPetTime == '') {
              this.showAlert('Warning', 'Time Kosong ' + this.pickPetTime);
            } else {
              // this.onSaveTransaction();

              console.log('_________________HASIL___________');
              console.log('Name : ', this.pickUsername);
              console.log('Email : ', this.pickEmail);
              console.log('Package : ', this.pickPackage);
              console.log('Service : ', this.pickService);
              console.log('Address : ', this.pickAddressAddress2);
              console.log('Name Address : ', this.pickAddressName2);
              console.log('Phone Address : ', this.pickAddressPhone2);
              console.log('Pet Name : ', this.pickPetName);
              console.log('Pet Type : ', this.pickPetType);
              console.log('Date : ', this.pickPetDate);
              console.log('Time : ', this.pickPetTime);
              console.log('_________________________________');

              const alert = await this.alertController.create({
                cssClass: 'my-custom-class',
                header: 'Confirm',
                message: 'Make Transaction ?',
                buttons: [
                  {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: (cancel) => {
                      console.log('Confirm Cancel');
                    },
                  },
                  {
                    text: 'Okay',
                    handler: () => {
                      console.log('Confirm Okay');

                      var indexLen = this.pets.length;
                      var newId = 1 + indexLen;
                      var dataTransaction = {
                        id: newId,
                        name: this.pickUsername,
                        package: this.pickPackage,
                        service: this.pickService,
                        email: this.pickEmail,
                        addressAddress: this.pickAddressAddress2,
                        addressName: this.pickAddressName2,
                        addressPhone: this.pickAddressPhone2,
                        petname: this.pickPetName,
                        pettype: this.pickPetType,
                        date: this.pickPetDate,
                        time: this.pickPetTime,
                        packagePayment: 85000,
                        servicePayment: 15000,
                      };
                      if (this.transactions.length > 0) {
                        this.transactions.length = 0;
                      }
                      this.transactions.push(dataTransaction);
                      console.log('panjang data', this.transactions.length);
                      this.storage.setObject('storageTransactions', {
                        transactions: this.transactions,
                      });
                      this.router.navigateByUrl('/transaction-confirm');
                    },
                  },
                ],
              });
              await alert.present();
            }
          }
        }
      } else {
        if (this.pickAddressAddress == 'Set Address') {
          this.showAlert(
            'Warning',
            'Address Kosong ' + this.pickAddressAddress
          );
        } else {
          if (this.pickPetName == '- set pet') {
            this.showAlert('Warning', 'Petname Kosong ' + this.pickPetName);
          } else {
            if (this.pickPetDate == '') {
              this.showAlert('Warning', 'Date Kosong ' + this.pickPetDate);
            } else {
              if (this.pickPetTime == '') {
                this.showAlert('Warning', 'Time Kosong ' + this.pickPetTime);
              } else {
                // this.onSaveTransaction();

                console.log('_________________HASIL___________');
                console.log('Name : ', this.pickUsername);
                console.log('Email : ', this.pickEmail);
                console.log('Package : ', this.pickPackage);
                console.log('Service : ', this.pickService);
                console.log('Address : ', this.pickAddressAddress);
                console.log('Name Address : ', this.pickAddressName);
                console.log('Phone Address : ', this.pickAddressPhone);
                console.log('Pet Name : ', this.pickPetName);
                console.log('Pet Type : ', this.pickPetType);
                console.log('Date : ', this.pickPetDate);
                console.log('Time : ', this.pickPetTime);
                console.log('_________________________________');

                const alert = await this.alertController.create({
                  cssClass: 'my-custom-class',
                  header: 'Confirm',
                  message: 'Make Transaction ?',
                  buttons: [
                    {
                      text: 'Cancel',
                      role: 'cancel',
                      cssClass: 'secondary',
                      handler: (cancel) => {
                        console.log('Confirm Cancel');
                      },
                    },
                    {
                      text: 'Okay',
                      handler: () => {
                        console.log('Confirm Okay');

                        var indexLen = this.pets.length;
                        var newId = 1 + indexLen;
                        var dataTransaction = {
                          id: newId,
                          name: this.pickUsername,
                          package: this.pickPackage,
                          service: this.pickService,
                          email: this.pickEmail,
                          addressAddress: this.pickAddressAddress,
                          addressName: this.pickAddressName,
                          addressPhone: this.pickAddressPhone,
                          petname: this.pickPetName,
                          pettype: this.pickPetType,
                          date: this.pickPetDate,
                          time: this.pickPetTime,
                          packagePayment: 85000,
                          servicePayment: 15000,
                        };
                        //sebelum push check ada data di this.transactions
                        if (this.transactions.length > 0) {
                          this.transactions.length = 0;
                        }
                        this.transactions.push(dataTransaction);
                        this.storage.setObject('storageTransactions', {
                          transactions: this.transactions,
                        });
                        this.router.navigateByUrl('/transaction-confirm');
                      },
                    },
                  ],
                });
                await alert.present();
              }
            }
          }
        }
      }
    }
  }

  // ______ Slide 3 ______________________________________________________________ End _______
}
