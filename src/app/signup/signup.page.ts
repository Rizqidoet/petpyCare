import { Component, OnInit } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  constructor(public alert: AlertController, public router: Router) {}

  email: string = '';
  password: string = '';

  async onSignUp() {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, this.email, this.password)
      .then((userCredential) => {
        const user = userCredential.user;
        this.email = '';
        this.password = '';
        this.router.navigate(['/signin']);
        this.showAlert('Congratulation', 'Your Register Is Successfull!');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        var errMsg = '';
        if (errorCode === 'auth/invalid-email') {
          errMsg = 'email does not match';
          this.showAlert('Register Fail!', errMsg);
          this.email = '';
        } else if (errorCode === 'auth/email-already-in-use') {
          errMsg = 'email already registered';
          this.showAlert('Register Fail!', errMsg);
          this.email = '';
        } else if (errorCode === 'auth/weak-password') {
          errMsg = 'Minimum password 6 characters';
          this.showAlert('Register Fail!', errMsg);
        } else if (errorCode === 'auth/internal-error') {
          errMsg = 'password cannot be empty!';
          this.showAlert('Register Fail!', errMsg);
        }
        // ..
      });
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alert.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  ngOnInit() {}
}
