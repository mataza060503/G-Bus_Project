import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentEWalletComponent } from './payment-ewallet.component';

describe('PaymentEWalletComponent', () => {
  let component: PaymentEWalletComponent;
  let fixture: ComponentFixture<PaymentEWalletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaymentEWalletComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaymentEWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
