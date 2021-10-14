import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { OrderSelectpaymentmodalPage } from './../order-selectpaymentmodal/order-selectpaymentmodal.page';

@Component({
  selector: 'app-order-selectpayment',
  templateUrl: './order-selectpayment.page.html',
  styleUrls: ['./order-selectpayment.page.scss'],
})
export class OrderSelectpaymentPage implements OnInit {
  constructor(private modalController: ModalController) {}

  ngOnInit() {
    var x = document.getElementById('FormDetail');
    x.style.display = 'block';
    x.style.animation = 'animatetop 1.0s';
  }

  async openModal() {
    console.log('Hallo Console Log dari openModal');
    const modal = await this.modalController.create({
      component: OrderSelectpaymentmodalPage,
    });

    await modal.present();
  }
}
