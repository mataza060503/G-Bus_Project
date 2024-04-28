import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingHistoryUnpaidticketsComponent } from './booking-history-unpaidtickets.component';

describe('BookingHistoryUnpaidticketsComponent', () => {
  let component: BookingHistoryUnpaidticketsComponent;
  let fixture: ComponentFixture<BookingHistoryUnpaidticketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookingHistoryUnpaidticketsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookingHistoryUnpaidticketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
