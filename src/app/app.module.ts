import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { IonicStorageModule } from '@ionic/storage-angular';

const firebaseConfig = {
  apiKey: 'AIzaSyB8XS8MFVLSmoJ0jiTEzt2-XnMk_mldf1w',
  authDomain: 'wawapetpy.firebaseapp.com',
  projectId: 'wawapetpy',
  storageBucket: 'wawapetpy.appspot.com',
  messagingSenderId: '449298507275',
  appId: '1:449298507275:web:b85cac2c2b99f8d4e9890e',
  measurementId: 'G-MZ5QDPJM4N',
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
