import { Component } from '@angular/core';
import { DataService } from '../../../services/Data.service';
import { OrderTicket } from '../../../models/ticket';

@Component({
  selector: 'app-booking-history-unpaidtickets',
  templateUrl: './booking-history-unpaidtickets.component.html',
  styleUrl: './booking-history-unpaidtickets.component.scss'
})
export class BookingHistoryUnpaidticketsComponent {
  orders!: OrderTicket[]
  errMessage: string = ""
  accountId: string = "account1"

  constructor(private dataService: DataService) {
    this.loadOrderData(this.accountId, "Unpaid")
  }
  loadOrderData(accountId: string, status: string) {
    this.dataService.getAllOrderByStatus(accountId, status).subscribe({
      next: (data) => {
        this.orders = data
        console.log(data)
      }, error: (err) => {
        this.errMessage = err
      }
    })
  }
}
