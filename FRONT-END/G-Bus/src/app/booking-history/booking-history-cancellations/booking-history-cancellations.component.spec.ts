import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingHistoryCancellationsComponent } from './booking-history-cancellations.component';

describe('BookingHistoryCancellationsComponent', () => {
  let component: BookingHistoryCancellationsComponent;
  let fixture: ComponentFixture<BookingHistoryCancellationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookingHistoryCancellationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookingHistoryCancellationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
