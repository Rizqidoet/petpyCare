import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OrderSelectpetmodalPage } from './order-selectpetmodal.page';

describe('OrderSelectpetmodalPage', () => {
  let component: OrderSelectpetmodalPage;
  let fixture: ComponentFixture<OrderSelectpetmodalPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderSelectpetmodalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OrderSelectpetmodalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
