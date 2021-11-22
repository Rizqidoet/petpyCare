import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TransactionServiceAnjingPage } from './transaction-service-anjing.page';

describe('TransactionServiceAnjingPage', () => {
  let component: TransactionServiceAnjingPage;
  let fixture: ComponentFixture<TransactionServiceAnjingPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionServiceAnjingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionServiceAnjingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
