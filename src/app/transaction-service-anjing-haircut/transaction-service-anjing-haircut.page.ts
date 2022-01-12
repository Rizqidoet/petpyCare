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

  slideIndex: number;
  slideChanged() {
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
    console.log('pick segment', this.pickSegment);
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

  // _____ Function Pendukung ________________________________________________________ Start ________

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  defaultForm() {
    this.storageProduct_pickPackage = '';
    this.storageProduct_pickItemCode = '';
    this.storageProduct_pickPriceRate = 0;
    this.pickService = '';
    this.storageAddressPick_address = 'Set Address';
    this.storageAddressPick_nameAddress = '';
    this.storageAddressPick_phoneAddress = '';
    this.storagePetPick_name = '- set pet';
    this.storagePetPick_type = '';
    this.pickPetDate = '';
    this.pickPetTime = '';
    this.pickPayment = '';
    this.slideOpts;
  }

  closePage() {
    this.defaultForm();
    this.storage.removeItem('storageFilterPet');
    this.router.navigateByUrl('/home');
  }

  // ______ Function Pendukung ________________________________________________________ End ________

  // _____ Slide_1 _____________________________________________________________ Start ______

  storageProduct = [];
  storageProduct_item = [];
  storageUser_username: string;
  storageUser_email: string;
  storageProduct_pickPackage: string;
  storageProduct_pickItemCode: string;
  storageProduct_pickPriceRate: number;

  getStorage1() {
    this.storage.getObject('storageProductNormal').then((data: any) => {
      this.storageProduct = data;
      this.storageProduct_item = this.storageProduct['products'].filter(
        function (storageProduct) {
          return storageProduct.item_group == 'Haircut Anjing';
        }
      );
    });

    this.storage.getObject('storageUsers').then((data: any) => {
      this.storageUser_username = data['User'][0]['userUsername'];
      this.storageUser_email = data['User'][0]['userEmail'];
    });
  }

  taplistProduct(listproduct) {
    this.storageProduct_pickPackage = listproduct['item_name'];
    this.storageProduct_pickItemCode = listproduct['item_code'];
    this.storageProduct_pickPriceRate = listproduct['item_priceRate'];
    // console.log(
    //   this.storageProduct_pickPackage,
    //   this.storageProduct_pickItemCode,
    //   this.storageProduct_pickPriceRate
    // );
    // this.seeDetails();

    this.swipeNext();
  }

  async seeDetails(listproduct) {
    var itemCode = listproduct['item_code'];
    var itemPriceRate = listproduct['item_priceRate'];
    var itemDesc = listproduct['item_desc'];
    var itemName = listproduct['item_name'];
    // this.showAlert("Sekundren", "Malakundren nih guys");
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Detail Package',
      message:
        '<div>Name : ' +
        itemName +
        '</div><div>Code : ' +
        itemCode +
        '</div><div>Price : ' +
        itemPriceRate +
        '</div><div>Desc : ' +
        itemDesc +
        '</div>',
      buttons: ['OK'],
    });

    await alert.present();
  }

  // ______ Slide_1 _____________________________________________________________ End ______

  // ______ Slide_2 _____________________________________________________________ Start ______

  storageAddressPick_address: string;
  storageAddressPick_nameAddress: string;
  storageAddressPick_phoneAddress: string;
  storageAddressPick_argo2: number;
  pickService: string;
  storageAddressPick_address2: string;
  storageAddressPick_nameAddress2: string;
  storageAddressPick_phoneAddress2: string;
  storageAddressPick_argo: string;
  isShowCS: boolean = false;
  isShowHS: boolean = false;
  isShowDS: boolean = false;

  getStorage2() {
    this.storage.getObject('storageAddressPick').then((data: any) => {
      if (!data) {
        this.storageAddressPick_address = 'Set Address';
      } else {
        this.storageAddressPick_address = data['storageAddressPickAddress'];
        this.storageAddressPick_nameAddress = data['storageAddressPickName'];
        this.storageAddressPick_phoneAddress = data['storageAddressPickPhone'];
        this.storageAddressPick_argo = data['storageAddressPickArgo'];
      }
    });
  }

  enabledCS() {
    var a = document.getElementById('clinicRadio');
    a.setAttribute('value', 'OnClinic');
    this.pickService = 'OnClinic';
    this.storageAddressPick_address2 =
      'Jl. Bukit duri salatan RT 8 RW 03 no 87';
    this.storageAddressPick_nameAddress2 = 'Clinic';
    this.storageAddressPick_phoneAddress2 = '081280675738';
    this.storageAddressPick_argo2 = 0;

    this.isShowCS = true;
    this.isShowHS = false;
    this.isShowDS = false;
  }

  enabledHS() {
    var a = document.getElementById('clinicRadio');
    a.setAttribute('value', 'HomeService');
    this.pickService = 'HomeService';

    this.isShowCS = false;
    this.isShowHS = true;
    this.isShowDS = false;
  }

  enabledDS() {
    var a = document.getElementById('clinicRadio');
    a.setAttribute('value', 'DeliveryService');
    this.pickService = 'DeliveryService';

    this.isShowCS = false;
    this.isShowHS = false;
    this.isShowDS = true;
  }

  selectAddress() {
    this.storage.removeItem('storageAddressPick');
    this.router.navigateByUrl('/transaction-selectaddress');
  }
  // ______ Slide_2 _____________________________________________________________ End ______

  // ______ Slide_3 _____________________________________________________________ Start ______

  storagePetPick_name: string;
  storagePetPick_type: string;
  pickPetDate: string;
  pickPetTime: string;
  isShowCash: boolean = false;
  isShowTransfer: boolean = false;
  pickPayment: String;
  pets = [];
  transactions = [];
  servicePrice: number;

  getStorage3() {
    this.storage.getObject('storagePetPick').then((data: any) => {
      if (!data) {
        this.storagePetPick_name = '- set pet';
      } else {
        this.storagePetPick_name = data['storagePetPickName'];
        this.storagePetPick_type = data['storagePetPickType'];
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
    if (
      this.storageProduct_pickPackage == '' ||
      !this.storageProduct_pickPackage
    ) {
      this.showAlert(
        'Warning',
        'Package Kosong ' + this.storageProduct_pickPackage
      );
    } else {
      if (this.pickService == '') {
        this.showAlert('Warning', 'Service Kosong ' + this.pickService);
      } else if (this.pickService == 'OnClinic') {
        if (this.storagePetPick_name == '- set pet') {
          this.showAlert(
            'Warning',
            'Petname Kosong ' + this.storagePetPick_name
          );
        } else {
          if (this.pickPetDate == '') {
            this.showAlert('Warning', 'Date Kosong ' + this.pickPetDate);
          } else {
            if (this.pickPetTime == '') {
              this.showAlert('Warning', 'Time Kosong ' + this.pickPetTime);
            } else {
              if (this.pickPayment == '' || !this.pickPayment) {
                this.showAlert('Warning', 'Payment Kosong ' + this.pickPayment);
              } else {
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
                        var newId = indexLen + 1;
                        var dataTransaction = {
                          id: newId,
                          name: this.storageUser_username,
                          package: this.storageProduct_pickPackage,
                          service: this.pickService,
                          email: this.storageUser_email,
                          addressAddress: this.storageAddressPick_address2,
                          addressName: this.storageAddressPick_nameAddress2,
                          addressPhone: this.storageAddressPick_phoneAddress2,
                          petname: this.storagePetPick_name,
                          pettype: this.storagePetPick_type,
                          date: this.pickPetDate,
                          time: this.pickPetTime,
                          packagePayment: this.storageProduct_pickPriceRate,
                          servicePayment: this.storageAddressPick_argo2,
                          payment: this.pickPayment,
                        };

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
      } else {
        if (this.storagePetPick_name == '- set pet') {
          this.showAlert(
            'Warning',
            'Petname Kosong ' + this.storagePetPick_name
          );
        } else {
          if (this.pickPetDate == '') {
            this.showAlert('Warning', 'Date Kosong ' + this.pickPetDate);
          } else {
            if (this.pickPetTime == '') {
              this.showAlert('Warning', 'Time Kosong ' + this.pickPetTime);
            } else {
              if (this.pickPayment == '' || !this.pickPayment) {
                this.showAlert('Warning', 'Payment Kosong ' + this.pickPayment);
              } else {
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

                        if (this.storageAddressPick_argo == '1 Km') {
                          this.servicePrice = 10000;
                        } else if (this.storageAddressPick_argo == '2 km') {
                          this.servicePrice = 10000;
                        } else if (this.storageAddressPick_argo == '3 km') {
                          this.servicePrice = 10000;
                        } else if (this.storageAddressPick_argo == '4 km') {
                          this.servicePrice = 10000;
                        } else if (this.storageAddressPick_argo == '5 km') {
                          this.servicePrice = 10000;
                        } else if (this.storageAddressPick_argo == '6 km') {
                          this.servicePrice = 20000;
                        } else if (this.storageAddressPick_argo == '7 km') {
                          this.servicePrice = 20000;
                        } else if (this.storageAddressPick_argo == '8 km') {
                          this.servicePrice = 20000;
                        } else if (this.storageAddressPick_argo == '9 km') {
                          this.servicePrice = 20000;
                        } else {
                          this.servicePrice = 30000;
                        }

                        var indexLen = this.pets.length;
                        var newId = indexLen + 1;
                        var dataTransaction = {
                          id: newId,
                          name: this.storageUser_username,
                          package: this.storageProduct_pickPackage,
                          service: this.pickService,
                          email: this.storageUser_email,
                          addressAddress: this.storageAddressPick_address,
                          addressName: this.storageAddressPick_nameAddress,
                          addressPhone: this.storageAddressPick_phoneAddress,
                          petname: this.storagePetPick_name,
                          pettype: this.storagePetPick_type,
                          date: this.pickPetDate,
                          time: this.pickPetTime,
                          packagePayment: this.storageProduct_pickPriceRate,
                          servicePayment: this.servicePrice,
                          payment: this.pickPayment,
                        };

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

  // ______ Slide_3 _____________________________________________________________ End ______
}
