import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpCancelCompleteComponent } from './pop-up-cancel-complete.component';

describe('PopUpCancelCompleteComponent', () => {
  let component: PopUpCancelCompleteComponent;
  let fixture: ComponentFixture<PopUpCancelCompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopUpCancelCompleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopUpCancelCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
