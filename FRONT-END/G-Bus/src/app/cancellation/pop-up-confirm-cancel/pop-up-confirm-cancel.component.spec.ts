import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpConfirmCancelComponent } from './pop-up-confirm-cancel.component';

describe('PopUpConfirmCancelComponent', () => {
  let component: PopUpConfirmCancelComponent;
  let fixture: ComponentFixture<PopUpConfirmCancelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopUpConfirmCancelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopUpConfirmCancelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
