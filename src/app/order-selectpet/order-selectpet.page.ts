import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { OrderSelectpetmodalPage } from './../order-selectpetmodal/order-selectpetmodal.page';

@Component({
  selector: 'app-order-selectpet',
  templateUrl: './order-selectpet.page.html',
  styleUrls: ['./order-selectpet.page.scss'],
})
export class OrderSelectpetPage implements OnInit {
  constructor(public modalController: ModalController) {}

  ngOnInit() {
    var x = document.getElementById('FormDetail');
    x.style.display = 'block';
    x.style.animation = 'animatetop 1.5s';
  }

  async openModal() {
    console.log('Hallo Console Log dari openModal');
    const modal = await this.modalController.create({
      component: OrderSelectpetmodalPage,
    });

    await modal.present();
  }
}
