import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-selectdatetime',
  templateUrl: './order-selectdatetime.page.html',
  styleUrls: ['./order-selectdatetime.page.scss'],
})
export class OrderSelectdatetimePage implements OnInit {
  constructor() {}

  ngOnInit() {
    var x = document.getElementById('FormDetail');
    x.style.display = 'block';
    x.style.animation = 'animatetop 1.5s';
  }
}
