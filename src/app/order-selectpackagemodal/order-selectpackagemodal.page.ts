import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-order-selectpackagemodal',
  templateUrl: './order-selectpackagemodal.page.html',
  styleUrls: ['./order-selectpackagemodal.page.scss'],
})
export class OrderSelectpackagemodalPage implements OnInit {
  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  dataPackages = [
    {
      id: 1,
      name: 'Mandi Biasa',
      harga: '75.000',
      detail: 'Mandi Hewan Biasa',
    },
    {
      id: 2,
      name: 'Mandi Jamur',
      harga: '90.000',
      detail: 'Mandi untuk membersihkan jamur pada hewan',
    },
    {
      id: 3,
      name: 'Mandi Kutu',
      harga: '90.000',
      detail: 'Mandi untuk membersihkan kutu pada hewan',
    },
    {
      id: 4,
      name: 'Coloring',
      harga: '120.000',
      detail: 'Mewarnai ulang bulu hewan peliharanmu',
    },
    {
      id: 5,
      name: 'Lulur',
      harga: '120.000',
      detail: 'Memberikan lulur untuk hewan peliharaanmu',
    },
    {
      id: 6,
      name: 'SPA',
      harga: '120.000',
      detail: 'Memberikan SPA untuk hewan peliharaanmu',
    },
  ];

  dismissModal() {
    console.log('Hallo Console Log dari dismissModal');
    this.modalController.dismiss();
  }

  tapValue() {
    console.log('Hallo Console Log dari tapValue', this.dataPackages);
    this.modalController.dismiss();
  }
}
