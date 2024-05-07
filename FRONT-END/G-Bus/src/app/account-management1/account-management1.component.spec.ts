import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountManagement1Component } from './account-management1.component';

describe('AccountManagement1Component', () => {
  let component: AccountManagement1Component;
  let fixture: ComponentFixture<AccountManagement1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountManagement1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccountManagement1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
