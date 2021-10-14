import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-address',
  templateUrl: './list-address.page.html',
  styleUrls: ['./list-address.page.scss'],
})
export class ListAddressPage implements OnInit {
  constructor(private router: Router) {}

  dataAddresses = [
    {
      id: 1,
      name: 'Rumah Pribadi',
      detail: 'Jl. Jalan Dulu Ampe Pegel',
    },
    {
      id: 2,
      name: 'Rumah Mertua',
      detail: 'Jl. Mulu Naek Mobil Kek',
    },
    {
      id: 3,
      name: 'Kantor',
      detail: 'Jl. in Aja Dah, Emg Begini Nasibnye',
    },
  ];

  tapValue() {
    this.router.navigateByUrl('/order-grooming');
  }

  ngOnInit() {}
}
