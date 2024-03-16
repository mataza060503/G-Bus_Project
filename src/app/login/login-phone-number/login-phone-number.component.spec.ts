import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPhoneNumberComponent } from './login-phone-number.component';

describe('LoginPhoneNumberComponent', () => {
  let component: LoginPhoneNumberComponent;
  let fixture: ComponentFixture<LoginPhoneNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginPhoneNumberComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginPhoneNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
