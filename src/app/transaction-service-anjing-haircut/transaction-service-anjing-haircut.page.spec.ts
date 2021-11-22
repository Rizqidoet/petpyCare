import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TransactionServiceAnjingHaircutPage } from './transaction-service-anjing-haircut.page';

describe('TransactionServiceAnjingHaircutPage', () => {
  let component: TransactionServiceAnjingHaircutPage;
  let fixture: ComponentFixture<TransactionServiceAnjingHaircutPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionServiceAnjingHaircutPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionServiceAnjingHaircutPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
