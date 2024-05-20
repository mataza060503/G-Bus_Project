import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingHistoryCancellationsComponent } from './booking-history-cancellations/booking-history-cancellations.component';
import { BookingHistoryPaidticketsComponent } from './booking-history-paidtickets/booking-history-paidtickets.component';
import { BookingHistoryUnpaidticketsComponent } from './booking-history-unpaidtickets/booking-history-unpaidtickets.component';
import { RouterModule } from '@angular/router';




@NgModule({
  declarations: [
    BookingHistoryCancellationsComponent,
    BookingHistoryPaidticketsComponent,
    BookingHistoryUnpaidticketsComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ], exports: [
    BookingHistoryCancellationsComponent,
    BookingHistoryPaidticketsComponent,
    BookingHistoryUnpaidticketsComponent
  ]
})
export class BookingHistoryModule { }
