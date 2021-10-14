import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OrderSelectpaymentmodalPage } from './order-selectpaymentmodal.page';

describe('OrderSelectpaymentmodalPage', () => {
  let component: OrderSelectpaymentmodalPage;
  let fixture: ComponentFixture<OrderSelectpaymentmodalPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderSelectpaymentmodalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OrderSelectpaymentmodalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
