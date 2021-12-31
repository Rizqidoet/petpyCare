import { Component, OnInit, ViewChild } from '@angular/core';
import { StorageCapService } from '../../app/services/storage-cap.service';
import { Platform, ToastController, AlertController } from '@ionic/angular';
import { IonSlides } from '@ionic/angular';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-transaction-service-anjing-haircut',
  templateUrl: './transaction-service-anjing-haircut.page.html',
  styleUrls: ['./transaction-service-anjing-haircut.page.scss'],
})
export class TransactionServiceAnjingHaircutPage implements OnInit {
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
    // this.pickSegment = 'package';
  }

  // ______ Function On Load Page _____________________________________________________ End ______________

  // ______ Segmenttasi _____________________________________________________________ Start ______________

  slideIndex: number;
  slideChanged(event) {
    this.slides.getActiveIndex().then((index) => {
      this.slideIndex = index;
      // console.log('Current index: ' + index);
      if (index == 0) {
        var a = document.getElementById('segmentID');
        a.setAttribute('value', 'package');
        // console.log(a);
        this.pickSegment = 'package';
      } else if (index == 1) {
        var a = document.getElementById('segmentID');
        a.setAttribute('value', 'service');
        // console.log(a);
        this.pickSegment = 'service';
      } else if (index == 2) {
        var a = document.getElementById('segmentID');
        a.setAttribute('value', 'bookingpayment');
        // console.log(a);
        this.pickSegment = 'bookingpayment';
      } else {
        var a = document.getElementById('segmentID');
        a.setAttribute('value', 'package');
        // console.log(a);
        this.pickSegment = 'package';
      }
    });
  }

  pickSegment: string;
  segmentChanged(ev: any) {
    this.pickSegment = ev['detail']['value'];

    if (this.pickSegment == 'package') {
      this.slides.slideTo(0, 400, true);
    } else if (this.pickSegment == 'service') {
      this.slides.slideTo(1, 400, true);
    } else if (this.pickSegment == 'bookingpayment') {
      this.slides.slideTo(2, 400, true);
    } else {
      this.slides.slideTo(3, 400, true);
    }
  }

  // ______ Segmenttasi _____________________________________________________________ End ______________

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
    this.pickPayment = '';
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
    this.storage.getObject('storageProductNormal').then((data: any) => {
      this.storageProduct = data;
      this.listProducts_category = this.storageProduct['products'].filter(
        function (storageProduct) {
          return storageProduct.item_group == 'Haircut Anjing';
        }
      );
    });

    this.storage.getObject('storageUsers').then((data: any) => {
      this.pickUsername = data['User'][0]['userUsername'];
      this.pickEmail = data['User'][0]['userEmail'];
    });
  }

  taplistProduct(listproduct) {
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
    var a = document.getElementById('clinicRadio');
    a.setAttribute('value', 'OnClinic');
    this.pickService = 'OnClinic';
    this.pickAddressAddress2 = 'Jl. Bukit duri salatan RT 8 RW 03 no 87';
    this.pickAddressName2 = 'Clinic';
    this.pickAddressPhone2 = '081280675738';

    this.isShownCS = true;
    this.isShownHS = false;
    this.isShownDS = false;
  }

  enabledHS() {
    var a = document.getElementById('clinicRadio');
    a.setAttribute('value', 'HomeService');
    this.pickService = 'HomeService';

    this.isShownCS = false;
    this.isShownHS = true;
    this.isShownDS = false;
  }

  enabledDS() {
    var a = document.getElementById('clinicRadio');
    a.setAttribute('value', 'DeliveryService');
    this.pickService = 'DeliveryService';

    this.isShownCS = false;
    this.isShownHS = false;
    this.isShownDS = true;
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

  isShowCash: boolean = false;
  isShowTransfer: boolean = false;
  pickPayment: String;

  enabledCash() {
    this.pickPayment = 'cash';
    this.isShowCash = true;
    this.isShowTransfer = false;
  }
  enabledTransfer() {
    this.pickPayment = 'transfer';
    this.isShowCash = false;
    this.isShowTransfer = true;
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
          if (this.pickPetDate == '' || !this.pickPetDate) {
            this.showAlert('Warning', 'Date Kosong ' + this.pickPetDate);
          } else {
            if (this.pickPetTime == '' || !this.pickPetTime) {
              this.showAlert('Warning', 'Time Kosong ' + this.pickPetTime);
            } else {
              // this.onSaveTransaction();
              if (this.pickPayment == '' || !this.pickPayment) {
                this.showAlert('Warning', 'Payment Kosong ' + this.pickPayment);
              } else {
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
                console.log('Payment : ', this.pickPayment);
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
                          payment: this.pickPayment,
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
                if (this.pickPayment == '' || !this.pickPayment) {
                  this.showAlert(
                    'Warning',
                    'Payment Kosong ' + this.pickPayment
                  );
                } else {
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
                  console.log('Payment : ', this.pickPayment);
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
                            payment: this.pickPayment,
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
                // this.onSaveTransaction();
              }
            }
          }
        }
      }
    }
  }

  // ______ Slide 3 ______________________________________________________________ End _______
}
