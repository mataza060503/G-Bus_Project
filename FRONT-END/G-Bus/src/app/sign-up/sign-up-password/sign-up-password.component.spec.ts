import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpPasswordComponent } from './sign-up-password.component';

describe('SignUpPasswordComponent', () => {
  let component: SignUpPasswordComponent;
  let fixture: ComponentFixture<SignUpPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignUpPasswordComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignUpPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
