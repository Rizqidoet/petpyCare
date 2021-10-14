import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { OrderSelectpackagemodalPage } from './../order-selectpackagemodal/order-selectpackagemodal.page';

@Component({
  selector: 'app-order-selectpackage',
  templateUrl: './order-selectpackage.page.html',
  styleUrls: ['./order-selectpackage.page.scss'],
})
export class OrderSelectpackagePage implements OnInit {
  constructor(private modalController: ModalController) {}

  ngOnInit() {
    var x = document.getElementById('FormDetail');
    x.style.display = 'block';
    x.style.animation = 'animatetop 1.0s';
  }

  async openModal() {
    console.log('Hallo Console Log dari openModal');
    const modal = await this.modalController.create({
      component: OrderSelectpackagemodalPage,
    });

    await modal.present();
  }
}
