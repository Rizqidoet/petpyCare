import { Component, ViewChild, ElementRef } from '@angular/core';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { IonSlides, Platform } from '@ionic/angular';
import { antPath } from 'leaflet-ant-path';

@Component({
  selector: 'app-transaction-setaddress',
  templateUrl: './transaction-setaddress.page.html',
  styleUrls: ['./transaction-setaddress.page.scss'],
})
export class TransactionSetaddressPage {
  @ViewChild('map', { static: false }) mapContainer: ElementRef;
  @ViewChild('slides', { static: false }) slider: IonSlides;

  map: any;
  marker: L.Marker;
  segment = 0;
  searchKey: string;
  places = [];
  isMarkerSet: boolean = false;
  addressComponent: any;

  constructor(
    public http: HttpClient,
    private geolocation: Geolocation,
    private platform: Platform
  ) {}

  ionViewWillEnter() {
    // console.log(this.marker);
    this.loadMap();
  }

  loadMap() {
    //var map = L.map('map').fitWorld();
    this.map = L.map('map').fitWorld();
    // console.log("This Map",this.map);
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
        console.log('Location Found Listener');
        // console.log(e);
        if (!this.platform.is('cordova')) {
          // console.log('Platform is Web')
          this.setMarkertWithAnimation(e.latitude, e.longitude, true);
          console.log(e.latitude, e.longitude);

          L.marker([-6.226062, 106.858283])
            .addTo(this.map)
            .bindPopup('Wawa Petcare')
            .openPopup();

          antPath(
            [
              [e.latitude, e.longitude],
              [-6.226062, 106.858283],
            ],
            { color: '#FF0000', weight: 5, opacity: 0.6 }
          ).addTo(this.map);
        }
      });
    // For Mobile
    if (this.platform.is('cordova')) {
      this.geolocation
        .getCurrentPosition()
        .then((resp) => {
          // console.log('Platform is android/ios')
          this.setMarkertWithAnimation(
            resp.coords.latitude,
            resp.coords.longitude,
            true
          );
        })
        .catch((error) => {
          //  console.log('Error getting location', error);
        });
    }

    // Adding Map Click Event
    this.map.on('click', (e) => {
      // console.log('Map Clicked')
      this.setMarkertWithAnimation(e.latlng.lat, e.latlng.lng, false);
      console.log(e.latlng.lat, e.latlng.lng);
    });
  }

  setMarkertWithAnimation(lat, lng, force: boolean) {
    //console.log(map);
    //var map =this.map;

    if (!force) {
      console.log('Sampe Sini');
      if (this.marker !== undefined) {
        console.log('marker was already there so removing it...');
        // console.log('before remove', this.marker)
        // this.map.removeLayer(this.marker);
        // this.marker = null;
        antPath.pause = true;
        this.marker.remove();

        this.marker = L.marker([lat, lng])
          .addTo(this.map)
          .bindPopup('Your Location')
          .openPopup();
        antPath(
          [
            [lat, lng],
            [-6.226062, 106.858283],
          ],
          {
            color: '#FF0000',
            weight: 5,
            opacity: 0.6,
          }
        ).addTo(this.map);
        this.marker.on('click', () => {
          console.log('marker clicked');
        });

        this.map.addLayer(this.marker);

        // console.log('after remove', this.marker)
        this.map.setView({ lat, lng }, this.map.getZoom(), {
          animate: true,
          pan: {
            duration: 4,
          },
        });
        this.http
          .get(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`
          )
          .subscribe((data: any) => {
            // console.log('Address Data',data)
            this.addressComponent = data.address;
            this.searchKey = data.display_name;
          });
      }
    } else {
      console.log('Sampe Sini Nih');

      this.marker = L.marker([lat, lng]).on('click', () => {
        // console.log('marker clicked');
      });
      this.map.addLayer(this.marker);

      console.log('marker', this.marker);

      this.map.setView({ lat, lng }, this.map.getZoom(), {
        animate: true,
        pan: {
          duration: 4,
        },
      });

      this.http
        .get(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`
        )
        .subscribe((data: any) => {
          console.log('Address Data', data);
          this.addressComponent = data.address;
          this.searchKey = data.display_name;
        });
    }
    setTimeout(() => {
      this.map.invalidateSize();
    }, 500);
  }

  centered() {
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

  search() {
    if (this.searchKey === '') {
      // console.log("Empty Keyword");
      this.places = [];
    } else if (this.searchKey.length >= 3) {
      // console.log("Has a keyword");
      // console.log(this.searchKey);
      let url =
        'https://nominatim.openstreetmap.org/search?format=json&q=' +
        this.searchKey;
      this.http.get(url).subscribe((data: any) => {
        // console.log(data);
        this.places = data;
      });
    }
  }

  keywordChanged(event) {
    setTimeout(() => {
      // console.log('changed', event);
      this.searchKey = event;
      //this.search();
    });
  }

  onClickPickAddress(lat, lng) {
    this.places = [];
    // console.log('0')

    this.setMarkertWithAnimation(lat, lng, false);
    console.log(lat, lng);
    var x = document.getElementById('FormDetail');
    x.style.display = 'block';
    x.style.animation = 'animatetop 0.8s';
    x.style.marginTop = '450px';
    x.style.marginLeft = '25px';
  }

  Hide() {
    var x = (document.getElementById('FormDetail').style.display = 'none');
  }
}
