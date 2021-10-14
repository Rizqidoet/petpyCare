import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-order-selectpaymentmodal',
  templateUrl: './order-selectpaymentmodal.page.html',
  styleUrls: ['./order-selectpaymentmodal.page.scss'],
})
export class OrderSelectpaymentmodalPage implements OnInit {
  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  dataPayments = [
    {
      id: 1,
      name: 'Cash',
      detail: 'Pembayaran dilakukan dengan uang cash fisik',
    },
    {
      id: 2,
      name: 'Saldo Petpy',
      detail: 'Pembayaran dilakukan dengan pemotongan saldo petpy mu',
    },
    {
      id: 3,
      name: 'Transfer Bank',
      detail: 'Pembayaran dilakukan dengan men-transfer ke rekening tim petpy',
    },
  ];

  dismissModal() {
    console.log('Hallo Console Log dari dismissModal');
    this.modalController.dismiss();
  }

  tapValue() {
    console.log('Hallo Console Log dari tapValue', this.dataPayments);
    this.modalController.dismiss();
  }
}
