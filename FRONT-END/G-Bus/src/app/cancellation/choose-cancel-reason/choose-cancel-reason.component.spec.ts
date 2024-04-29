import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseCancelReasonComponent } from './choose-cancel-reason.component';

describe('ChooseCancelReasonComponent', () => {
  let component: ChooseCancelReasonComponent;
  let fixture: ComponentFixture<ChooseCancelReasonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChooseCancelReasonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChooseCancelReasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
