import { Component } from '@angular/core';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor() {}

  async onSignOut() {
    await GoogleAuth.signOut();
    //this.username = "";
  }
}
