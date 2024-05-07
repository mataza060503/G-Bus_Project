import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingHistoryPaidticketsComponent } from './booking-history-paidtickets.component';

describe('BookingHistoryPaidticketsComponent', () => {
  let component: BookingHistoryPaidticketsComponent;
  let fixture: ComponentFixture<BookingHistoryPaidticketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookingHistoryPaidticketsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookingHistoryPaidticketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
