import { Component, ViewChild, ElementRef } from '@angular/core';
// import * as L from 'leaflet';
import {
  latLng,
  tileLayer,
  Icon,
  icon,
  Marker
} from 'leaflet';
import 'leaflet';
import 'leaflet-routing-machine';
declare let L;
import { HttpClient } from '@angular/common/http';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { IonSlides, Platform } from '@ionic/angular';
import { antPath } from 'leaflet-ant-path';
import { StorageCapService } from '../../app/services/storage-cap.service';
import { Router } from '@angular/router';

import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-transaction-setaddress',
  templateUrl: './transaction-setaddress.page.html',
  styleUrls: ['./transaction-setaddress.page.scss'],
})
export class TransactionSetaddressPage {
  @ViewChild('map', { static: false }) mapContainer: ElementRef;
  @ViewChild('slides', { static: false }) slider: IonSlides;

  constructor(
    public http: HttpClient,
    private geolocation: Geolocation,
    private platform: Platform,
    public alertController: AlertController,
    private storage: StorageCapService,
    private router: Router
  ) {}

  ionViewWillEnter() {
    // console.log(this.marker);
    this.getStorage();
    this.loadMap();
    this.mapClick();
    // this.drawMap();
  }

  // drawMap(): void {
  //   this.map = L.map('map').fitWorld();
  //   // console.log('This Map', this.map);
  //   L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //     attribution: 'contributor',
  //     maxZoom: 15,
  //   }).addTo(this.map);

  //   L.Routing.control({
  //     waypoints: [
  //       L.latLng(-6.224543, 106.855140),
  //       L.latLng(-6.273377, 106.855009)
  //     ],
  //   }).addTo(this.map);
  // }



  // _____ Onload _________________________________________________ Start ________

  map: any;
  marker: L.Marker;
  addressComponent: any;
  storageAddress: string;
  sekundren = null;

  loadMap() {
    this.map = L.map('map').fitWorld();
    // console.log('This Map', this.map);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'contributor',
      maxZoom: 15,
    }).addTo(this.map);
    
    // For Web
    this.map
      .locate({
        setView: true,
        maxZoom: 15,
      })
      .on('locationfound', (e) => {
        console.log("E =", e);
        this.sekundren = L.Routing.control({
          waypoints: [
            // L.latLng(-6.2207745, 106.8536878),
            L.latLng(-6.226373, 106.858261),
            L.latLng(e.latitude, e.longitude),
          ]
        }).addTo(this.map);
        
        this.marker.remove();
        this.setMarkertWithAnimation(e.latitude, e.longitude, true);
      });
  }

  setMarkertWithAnimation(lat, lng, changeLocation: boolean) {

    this.marker = L.marker([lat, lng]);
      this.map.setView({ lat, lng }, this.map.getZoom(), {
        animate: true,
        pan: {
          duration: 4,
        },
      });

      if(this.marker != null){
        console.log("Marker terisi");
      }else{
        console.log("Marker Kosong");
      }
      this.http
        .get(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`
        )
        .subscribe((data: any) => {
          console.log('Address Data', data);
          console.log("Sekundren = ", this.sekundren);
         
          if(this.sekundren !== null){
            this.map.removeControl(this.sekundren);
            this.sekundren = null;
           

            this.sekundren = L.Routing.control({
              waypoints: [
                // L.latLng(-6.2207745, 106.8536878),
                L.latLng(-6.226373, 106.858261),
                L.latLng(lat, lng),
              ]
            }).addTo(this.map);
          }

        //   this.sekundren.on('routesfound', function(e) {
        //     var routes = e.routes;
        //     var summary = routes[0].summary;
        //     // alert distance and time in km and minutes
        //     console.log('Total distance is ' + summary.totalDistance / 1000 + "Pembulatan = " + Math.round(summary.totalDistance / 1000) + ' km and total time is ' + Math.round(summary.totalTime % 3600 / 60) + ' minutes');
        //  });
         

         this.addressComponent = data.address;
         this.storageAddress = data.display_name;

          this.marker = L.marker([lat, lng])
            .addTo(this.map)
            .bindPopup(data.display_name)
            .openPopup();
        });
        

    // if (changeLocation) {
    //   // console.log('Lokasi masih sesuai gps device', changeLocation);

    //   this.marker = L.marker([lat, lng]);
    //   this.map.setView({ lat, lng }, this.map.getZoom(), {
    //     animate: true,
    //     pan: {
    //       duration: 4,
    //     },
    //   });

    //   this.http
    //     .get(
    //       `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`
    //     )
    //     .subscribe((data: any) => {
    //       console.log('Address Data', data);

    //       var sekundren = L.Routing.control({
    //         waypoints: [
    //           // L.latLng(-6.2207745, 106.8536878),
    //           L.latLng(-6.226373, 106.858261),
    //           L.latLng(lat, lng),
    //         ]
    //       }).addTo(this.map);

    //       sekundren.on('routesfound', function(e) {
    //         var routes = e.routes;
    //         var summary = routes[0].summary;
    //         // alert distance and time in km and minutes
    //         console.log('Total distance is ' + summary.totalDistance / 1000 + "Pembulatan = " + Math.round(summary.totalDistance / 1000) + ' km and total time is ' + Math.round(summary.totalTime % 3600 / 60) + ' minutes');
    //      });
         

    //      this.addressComponent = data.address;
    //      this.storageAddress = data.display_name;

    //       this.marker = L.marker([lat, lng])
    //         .addTo(this.map)
    //         .bindPopup(data.display_name)
    //         .openPopup();
    //     });

    //   // this.marker = L.marker([lat, lng]).on('click', () => {
    //   //   console.log('marker clicked');
    //   //   // this.enableForm();
    //   // });
    // } else {
    //   // console.log('Lokasi telah diubah', this.marker);
    //   this.marker.remove();
    //   this.map.addLayer(this.marker);

    //   this.map.setView({ lat, lng }, this.map.getZoom(), {
    //     animate: true,
    //     pan: {
    //       duration: 4,
    //     },
    //   });
    //   this.http
    //     .get(
    //       `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`
    //     )
    //     .subscribe((data: any) => {
    //       this.marker.remove();
    //       // console.log('Address Data baru',data)
    //       this.map.removeLayer(this.marker)
    //       if(sekundren){
    //         console.log("Sekundren True")
    //         sekundren.spliceWaypoints(0, 2);
    //       }else{
    //         console.log("Sekundren False")
    //       }

         

    //       var sekundren = L.Routing.control({
    //         waypoints: [
    //           L.latLng(-6.2207745, 106.8536878),
    //           L.latLng(lat, lng),
    //         ]
    //       }).addTo(this.map);

    //       sekundren.on('routesfound', function(e) {
    //         var routes = e.routes;
    //         var summary = routes[0].summary;
    //         // alert distance and time in km and minutes
    //         console.log('Total distance is ' + summary.totalDistance / 1000 + "Pembulatan = " + Math.round(summary.totalDistance / 1000) + ' km and total time is ' + Math.round(summary.totalTime % 3600 / 60) + ' minutes');
    //      });

    //      this.addressComponent = data.address;
    //      this.storageAddress = data.display_name;
    //       // this.marker = L.marker([data['lat'], data['lon']])
    //       //   .addTo(this.map)
    //       //   .bindPopup(data.display_name)
    //       //   .openPopup();
    //     });

    //   this.marker.on('click', () => {
    //     // console.log('marker clicked');
    //     // this.enableForm();
    //   });
    // }
    // setTimeout(() => {
    //   this.map.invalidateSize();
    // }, 500);
  }

  mapClick() {
    // Adding Map Click Event
    this.map.on('click', (e) => {
      this.marker.remove();
      this.setMarkertWithAnimation(e.latlng.lat, e.latlng.lng, false);
    });
  }

  // _____ Onload _________________________________________________ End ________

  // _____ getGps _________________________________________________ Start ________

  getGps() {
    var ini = this;
    navigator.geolocation.getCurrentPosition(
      function (p) {
        ini.map.panTo({
          lat: p.coords.latitude,
          lng: p.coords.longitude,
        });
        ini.setMarkertWithAnimation(
          p.coords.latitude,
          p.coords.longitude,
          false
        );
      },
      function (err) {
        // console.log(err);
      }
    );
  }

  // _____ getGps _________________________________________________ End ________

  // _____ Search address _________________________________________________ Start ________

  places = [];

  search() {
    if (this.storageAddress === '') {
      // console.log("Empty Keyword");
      this.places = [];
    } else if (this.storageAddress.length >= 3) {
      // console.log("Has a keyword");
      // console.log(this.storageAddress);
      let url =
        'https://nominatim.openstreetmap.org/search?format=json&q=' +
        this.storageAddress;
      this.http.get(url).subscribe((data: any) => {
        // console.log(data);
        this.places = data;
      });
    }
  }

  keywordChanged(event) {
    setTimeout(() => {
      // console.log('changed', event);
      this.storageAddress = event;
      //this.search();
    });
  }

  onClickPickAddress(lat, lng) {
    this.places = [];

    this.setMarkertWithAnimation(lat, lng, false);
    // console.log(lat, lng);
    this.enableForm();
  }

  // _____ Search address _________________________________________________ End ________

  // _____ Function Pembantu _________________________________________________ Start ________

  defaultForm() {
    var x = (document.getElementById('FormDetail').style.display = 'none');
    this.addressName = '';
    this.addressPhone = '';
  }

  enableForm() {
    var x = document.getElementById('FormDetail');
    x.style.display = 'block';
    x.style.animation = 'animatetop 0.8s';
    x.style.marginTop = '480px';
    x.style.marginLeft = '25px';
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  // _____ Function Pembantu _________________________________________________ End ________

  // _____ Save Address _________________________________________________ Start ________

  addressName: string = '';
  addressPhone: string = '';
  pickMenu: String;
  categoryPet: String;
  storageArrayAddress = [];
  storageArrayAddress2 = [];
  jumlahArrayStorage: number;

  getStorage() {
    this.storage.getObject('storageAddress').then((data: any) => {
      if (!data) {
        this.jumlahArrayStorage = 0;
        this.storageArrayAddress = [];
        // console.log('jumlahArrayStorage kosong', this.jumlahArrayStorage);
      } else {
        this.storageArrayAddress = data['address'];
        this.jumlahArrayStorage = data['address'].length;
        // console.log('jumlahArrayStorage isi', this.jumlahArrayStorage);
      }

      // console.log('jumlah Array Storage OnLoad :', this.jumlahArrayStorage);
    });
    this.storage.getObject('storageFilterPet').then((data: any) => {
      this.pickMenu = data.name;
      this.categoryPet = data.category;

      // console.log('pick menu : ', this.pickMenu);
      // console.log('category menu : ', this.categoryPet);
    });
  }

  async saveAddress() {
    if (this.addressName === '' || this.addressName.length < 4) {
      //console.log('Name address is not valid');
      this.showAlert(
        'validation failed',
        'min chararcters for name address : 4'
      );
    } else {
      //console.log('Name Address valid');
      if (this.addressPhone == '' || this.addressPhone.length < 8) {
        //console.log('Phone number is not valid', this.addressPhone.length);
        this.showAlert(
          'validation failed',
          'min chararcters for phone number : 9'
        );
      } else {
        //console.log('Phone number valid', this.addressPhone.length);

        const alert = await this.alertController.create({
          cssClass: 'my-custom-class',
          header: 'Confirm',
          message: 'Save address ?',
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
                // console.log('Confirm Okay');

                // console.log('address :', this.storageAddress);
                // console.log('name address :', this.addressName);
                // console.log('phone address :', this.addressPhone);

                //var indexLen = this.storageArrayAddress.length;
                var newId = 1 + this.jumlahArrayStorage;
                // console.log(
                //   'IndexLen : ',
                //   this.jumlahArrayStorage,
                //   'NewId ; ',
                //   newId
                // );

                var dataAddress = {
                  id: newId,
                  address: this.storageAddress,
                  addressName: this.addressName,
                  addressPhone: this.addressPhone,
                };
                this.storage.setObject('storageAddressPick', {
                  storageAddressPickAddress: this.storageAddress,
                  storageAddressPickName: this.addressName,
                  storageAddressPickPhone: this.addressPhone,
                });
                this.storageArrayAddress.push(dataAddress);
                this.storage.setObject('storageAddress', {
                  address: this.storageArrayAddress,
                });

                this.defaultForm();
                this.getStorage();
                this.router.navigateByUrl('/transaction-' + this.pickMenu);
              },
            },
          ],
        });

        await alert.present();
      }
    }
  }

  // _____ Save Address _________________________________________________ End ________
}
