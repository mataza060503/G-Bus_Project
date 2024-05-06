import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccesfulPaymentComponent } from './succesful-payment.component';

describe('SuccesfulPaymentComponent', () => {
  let component: SuccesfulPaymentComponent;
  let fixture: ComponentFixture<SuccesfulPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuccesfulPaymentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuccesfulPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
