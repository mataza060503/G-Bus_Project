import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpPhoneNumberComponent } from './sign-up-phone-number.component';

describe('SignUpPhoneNumberComponent', () => {
  let component: SignUpPhoneNumberComponent;
  let fixture: ComponentFixture<SignUpPhoneNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignUpPhoneNumberComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignUpPhoneNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
