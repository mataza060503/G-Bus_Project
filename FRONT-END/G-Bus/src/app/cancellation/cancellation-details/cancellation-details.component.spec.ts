import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancellationDetailsComponent } from './cancellation-details.component';

describe('CancellationDetailsComponent', () => {
  let component: CancellationDetailsComponent;
  let fixture: ComponentFixture<CancellationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CancellationDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CancellationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
