import { Component, OnInit, ViewChild } from '@angular/core';
import { StorageCapService } from '../../app/services/storage-cap.service';
import { Platform, ToastController, AlertController } from '@ionic/angular';
import { IonSlides } from '@ionic/angular';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.page.html',
  styleUrls: ['./transaction.page.scss'],
})
export class TransactionPage implements OnInit {
  @ViewChild('mySlider') slides: IonSlides;
  constructor(
    private platform: Platform,
    public alertController: AlertController,
    private storage: StorageCapService,
    private router: Router
  ) {}

  // ______Function On Load Page_____________________________________________________Start__________

  async ngOnInit() {}

  ionViewWillEnter() {
    // console.log(this.marker);
    this.getStorage1();
    this.getStorage2();
    this.getStorage3();
    this.defaultForm();
    console.log('Service pas Load : ', this.transaction_service);
  }

  // ______Function On Load Page_____________________________________________________End__________

  // ______Slide_1______________________________________________________________Start_______

  listProducts_cat = [];
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

  listProductName: string;

  getStorage1() {
    this.storage.getObject('storageProducts').then((data: any) => {
      this.storageProduct = data;
      this.listProducts_cat = this.storageProduct['product'].filter(function (
        storageProduct
      ) {
        return storageProduct.item_group == 'Cukur Kucing';
      });
      console.log('Array Product Cukur Kucing = ', this.listProducts_cat);
    });
  }

  taplistProduct(listproduct) {
    //this.storage.removeItem('pickAddress');

    console.log('Detail Listproduct :', listproduct);
    this.listProductName = listproduct['item_name'];
    this.swipeNext();
  }

  // ______Slide_1______________________________________________________________End_______

  // ______ Slide 2 ______________________________________________________________ Start _______

  addressPickAddress2: string;
  addressPickName2: string;
  addressPickPhone2: string;
  addressPickAddress: string;
  addressPickName: string;
  addressPickPhone: string;
  isShownCS: boolean = false;
  isShownHS: boolean = false;
  isShownDS: boolean = false;

  getStorage2() {
    this.storage.getObject('storageAddressPick').then((data: any) => {
      if (!data) {
        this.addressPickAddress = 'Set Address';
      } else {
        this.addressPickAddress = data['storageAddressPickAddress'];
        this.addressPickName = data['storageAddressPickName'];
        this.addressPickPhone = data['storageAddressPickPhone'];
      }

      console.log(
        'Isi :',
        this.addressPickAddress +
          ' - ' +
          this.addressPickName +
          ' - ' +
          this.addressPickPhone
      );
    });
  }

  onChangeRadio(event) {
    this.transaction_service = event.detail['value'];
    console.log('Service Diset Menjadi : ', this.transaction_service);
  }

  selectAddress() {
    this.storage.removeItem('storageAddressPick');
    this.router.navigateByUrl('/transaction-selectaddress');
  }

  enabledCS() {
    console.log('Clinic Service Clicked');
    this.addressPickAddress2 = 'Jl. Bukit duri salatan RT 8 RW 03 no 87';
    this.addressPickName2 = 'Clinic';
    this.addressPickPhone2 = '081280675738 (admin petpy)';
    this.isShownCS = true;
    this.isShownHS = false;
    this.isShownDS = false;
    // console.log('Status HS :', this.isShownHS);
    // console.log('Status DS :', this.isShownDS);
    var z = document.getElementById('btnSlide2');
    z.style.marginTop = '135px';
  }

  enabledHS() {
    console.log('Home Service Clicked');
    this.isShownCS = false;
    this.isShownHS = true;
    this.isShownDS = false;
    // console.log('Status HS :', this.isShownHS);
    // console.log('Status DS :', this.isShownDS);
    var z = document.getElementById('btnSlide2');
    if (this.addressPickAddress == 'Set Address') {
      // console.log('Kosong');
      z.style.marginTop = '97px';
    } else {
      // console.log('Isi');
      z.style.marginTop = '42px';
    }
  }

  enabledDS() {
    console.log('Delivery Service Clicked');
    this.isShownCS = false;
    this.isShownHS = false;
    this.isShownDS = true;
    // console.log('Status HS :', this.isShownHS);
    // console.log('Status DS :', this.isShownDS);
    var z = document.getElementById('btnSlide2');
    if (this.addressPickAddress == 'Set Address') {
      // console.log('Kosong');
      z.style.marginTop = '90px';
    } else {
      // console.log('Isi');
      z.style.marginTop = '37px';
    }
  }
  // ______ Slide 2 ______________________________________________________________ End _______

  // ______Slide_3______________________________________________________________Start_______

  transactions = [];
  pets = [];
  transaction_name: string;
  transaction_email: string;
  transaction_addressAddress: string;
  transaction_addressName: string;
  transaction_addressPhone: string;
  transaction_petname: string;
  transaction_pettype: string;
  transaction_date: string;
  transaction_time: string;
  transaction_service: string;
  transaction_package: string;
  transaction_payment: string;
  transaction_totalamount: string;
  transaction_petpickname: string;
  transaction_petpicktype: string;

  getStorage3() {
    this.storage.getObject('storageUsers').then((data: any) => {
      this.transaction_name = data['User'][0]['userUsername'];
      this.transaction_email = data['User'][0]['userEmail'];
      console.log('Sekundren  = ', data['User'][0]);
      // this.showAlert('Your email is => ', this.storageEmail);
    });

    this.storage.getObject('storagePetPick').then((data: any) => {
      if (!data) {
        this.transaction_petpickname = '- set pet';
      } else {
        this.transaction_petpickname = data['storagePetPickName'];
        this.transaction_petpicktype = data['storagePetPickType'];
      }

      console.log('Isi :', this.addressPickAddress);
    });
  }

  setDate(date) {
    this.transaction_date = moment(date).format('MMM DD YYYY');
    console.log('date', this.transaction_date);
  }

  setTime(time) {
    this.transaction_time = moment(time).format('HH:mm');
    console.log('time', this.transaction_time);
  }

  CekValidasi() {
    this.listProductName = 'Sekundren';

    if (!this.listProductName) {
      console.log('Package masih Kosong', this.listProductName);
      // this.showAlert('Info', 'Package masih Kosong');
    } else {
      if (!this.transaction_service || this.transaction_service === '') {
        console.log('Service Kosong = ', this.transaction_service);
        // this.showAlert('Info', 'Service masih Kosong');
      } else if (this.transaction_service == 'OnClinic') {
        console.log('Service Onclinic = ', this.transaction_service);

        if (this.transaction_petpickname == '- set pet') {
          console.log('Pet masih Kosong', this.transaction_petpickname);
          // this.showAlert('Info', 'Pet masih Kosong');
        } else {
          if (!this.transaction_date) {
            console.log('Date masih Kosong', this.transaction_date);
            // this.showAlert('Info', 'Date masih Kosong');
          } else {
            if (!this.transaction_time) {
              console.log('Time masih Kosong', this.transaction_time);
              // this.showAlert('Info', 'Time masih Kosong');
            } else {
              this.transaction_addressAddress = this.addressPickAddress2;
              this.transaction_addressName = this.addressPickName2;
              this.transaction_addressPhone = this.addressPickPhone2;
              this.transaction_package = this.listProductName;
              this.transaction_petname = this.transaction_petpickname;
              this.transaction_pettype = this.transaction_petpicktype;

              this.onSaveTransaction();
            }
          }
        }
      } else {
        console.log('Service Home Delivery = ', this.transaction_service);

        if (this.addressPickAddress == 'Set Address') {
          console.log('Address masih Kosong', this.addressPickAddress);
          this.showAlert('Info', 'Address masih Kosong');
        } else {
          if (this.transaction_petpickname == '- set pet') {
            console.log('Pet masih Kosong', this.transaction_petpickname);
            this.showAlert('Info', 'Pet masih Kosong');
          } else {
            if (!this.transaction_date) {
              console.log('Date masih Kosong', this.transaction_date);
              this.showAlert('Info', 'Date masih Kosong');
            } else {
              if (!this.transaction_time) {
                console.log('Time masih Kosong', this.transaction_time);
                this.showAlert('Info', 'Time masih Kosong');
              } else {
                this.transaction_addressAddress = this.addressPickAddress;
                this.transaction_addressName = this.addressPickName;
                this.transaction_addressPhone = this.addressPickPhone;
                this.transaction_package = this.listProductName;
                this.transaction_petname = this.transaction_petpickname;
                this.transaction_pettype = this.transaction_petpicktype;
                this.onSaveTransaction();
              }
            }
          }
        }
      }
    }
  }

  async onSaveTransaction() {
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

            console.log('Transaction Name', this.transaction_name);
            console.log('Transaction email', this.transaction_email);
            console.log(
              'Transaction Address Address',
              this.transaction_addressAddress
            );
            console.log(
              'Transaction Address Name',
              this.transaction_addressName
            );
            console.log(
              'Transaction Address Phone',
              this.transaction_addressPhone
            );
            console.log('Transaction package', this.transaction_package);
            console.log('Transaction service', this.transaction_service);
            console.log('Transaction petname', this.transaction_petname);
            console.log('Transaction pettype', this.transaction_pettype);
            console.log('Transaction date', this.transaction_date);
            console.log('Transaction time', this.transaction_time);

            var indexLen = this.pets.length;
            var newId = 1 + indexLen;
            var dataTransaction = {
              id: newId,
              name: this.transaction_name,
              email: this.transaction_email,
              addressAddress: this.transaction_addressAddress,
              addressName: this.transaction_addressName,
              addressPhone: this.transaction_addressPhone,
              petname: this.transaction_petname,
              pettype: this.transaction_pettype,
              date: this.transaction_date,
              time: this.transaction_time,
              package: this.transaction_package,
              service: this.transaction_service,
              packagePayment: 85000,
              servicePayment: 15000,
            };
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

  // ______Slide_3______________________________________________________________End_______

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
    this.listProductName = '';
    this.addressPickAddress = 'Set Address';
    this.addressPickName = '';
    this.addressPickPhone = '';
    //this.transaction_service = '';
    this.transaction_petpickname = '- set pet';
    this.transaction_petpicktype = '';
    this.transaction_date = '';
    this.transaction_time = '';
  }

  // ______Function Pendukung___________________________________________________________End_________

  // ______Function On Change Radio Button___________________________________________Start____________

  // ______Function On Change Radio Button___________________________________________End____________
}
