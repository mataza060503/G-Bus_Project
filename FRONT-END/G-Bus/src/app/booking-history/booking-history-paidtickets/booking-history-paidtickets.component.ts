import { Component } from '@angular/core';
import { Bus, OrderTicket, OrderTicketLoaded, PostBookedTicket, RawOrderTicket } from '../../../models/ticket';
import { DataService } from '../../../services/Data.service';

@Component({
  selector: 'app-booking-history-paidtickets',
  templateUrl: './booking-history-paidtickets.component.html',
  styleUrl: './booking-history-paidtickets.component.scss'
})
export class BookingHistoryPaidticketsComponent {
  orders!: RawOrderTicket[]
  ordersData!: OrderTicketLoaded[]
  errMessage: string = ""
  accountId: string = ""
  intervalIds: any[] = []; // Store interval IDs for cleanup

  isSelected: boolean[] = [true, false, false]

  constructor(private dataService: DataService) {
    this.loadOrderData(this.accountId, "Unpaid")
    const userIdRaw = localStorage.getItem("userId")
    if (userIdRaw != null) {
      const userId = userIdRaw.replace(/"/g,'');
      this.accountId = userId
    }
  }
  loadOrderData(accountId: string, status: string) {
    this.dataService.getAllOrderByStatus(accountId, status).subscribe({
      next: (data) => {
        this.orders = data
        console.log(data)
        this.ordersData = []
        this.orders.forEach((rawOrder) => {
          const orderData: OrderTicketLoaded = {
            _id : rawOrder._id,
            PassengerInfo: rawOrder.PassengerInfo,
            Status: rawOrder.Status,
            CustomerId: rawOrder.CustomerId,
            Departure: {} as PostBookedTicket,
            DepartImage: "",
            DepartBusType: {} as Bus,
            Return: {} as PostBookedTicket,
            ReturnImage: "",
            ReturnBusType: {} as Bus,
            BookedTime: rawOrder.BookedTime,
            TransactionNumber: rawOrder.TransactionNumber,
          };
          this.startCountdown(orderData); // Start the countdown for each order
          if (this.isValidId(rawOrder.Departure.toString())) {
            this.dataService.getBookedTicket(rawOrder.Departure.toString()).subscribe({
              next: (data) => {
                orderData.Departure = data;
                console.log(data)
              },
              error: (err) => {
                console.error('Failed to load departure ticket data', err);
              }
            });
          }

          if (this.isValidId(rawOrder.Return.toString())) {
            this.dataService.getBookedTicket(rawOrder.Return.toString()).subscribe({
              next: (data) => {
                orderData.Return = data;
              },
              error: (err) => {
                console.error('Failed to load departure ticket data', err);
              }
            });
          }

          this.ordersData.push(orderData)
          
        });
        console.log(this.ordersData)
      }, error: (err) => {
        this.errMessage = err
      }
    })
  }
  isValidId(id: string): boolean {
    return typeof id === 'string' && /^[0-9a-fA-F]{24}$/i.test(id);
  }

  startCountdown(orderData: OrderTicketLoaded) {
    const endTime = new Date(orderData.BookedTime).getTime() + 15 * 60 * 1000; // 15 minutes from booked time
    orderData.TimeRemaining = ''; // Initialize with an empty string or a default value
    const intervalId = setInterval(() => {
      const now = new Date().getTime();
      const distance = endTime - now;
  
      if (distance < 0) {
        clearInterval(intervalId);
        orderData.TimeRemaining = "CANCELLED";
        //this.cancelOrder(orderData)
      } else {
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        orderData.TimeRemaining = `${minutes}m ${seconds}s`;
      }
    }, 1000);
    this.intervalIds.push(intervalId); // Keep track for cleanup
  }
  
  ngOnDestroy() {
    this.intervalIds.forEach(intervalId => clearInterval(intervalId));
  }

  cancelOrder(order: OrderTicketLoaded) {
    this.dataService.patchOrderStatus(order._id, "Cancelled").subscribe({
      next: (data) => {
        console.log(data)
        const index = this.ordersData.findIndex(o => o._id === order._id)
        if (index !== -1) {
          this.ordersData.splice(index, 1);
        }
      }
    })
    
  }

  selectedOrderStatus(id: number) {
    for (let i = 0; i < this.isSelected.length; i++) {
      this.isSelected[i] = false; 
    }
    this.isSelected[id] = true; 
  }

  formatNewTime(bookedTime: string, minutesToAdd: number) {
    const date = new Date(bookedTime);
    date.setMinutes(date.getMinutes() + minutesToAdd); // Add the minutes to the bookedTime

    // Formatting the date and time
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let day = date.getDate();
    let month = date.getMonth() + 1; // JavaScript months are 0-based
    let year = date.getFullYear();
    let dayOfWeek = date.getDay(); // Day of the week, where 0 is Sunday

    // Ensure two digits for hours, minutes, day, and month
    var hoursStr = ""
    var minutesStr = ""
    var daysStr = ""
    var monthsStr = ""
    if (hours < 10) {
      hoursStr = "0" + hours
    } else {
      hoursStr = hours.toString()
    }
    if (minutes < 10) {
      minutesStr = "0" + minutes
    } else {
      minutesStr = minutes.toString()
    }
    if (day < 10) {
      daysStr = "0" + day
    } else {
      daysStr = day.toString()
    }
    if (month < 10) {
      monthsStr = "0" + month
    } else {
      monthsStr = month.toString()
    }
    
    // Mapping day of the week to its name ('T2' for Tuesday, etc.)
    const daysOfWeek = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
    let weekday = daysOfWeek[dayOfWeek];

    // Constructing the formatted output
    return `${hoursStr}:${minutesStr} - ${weekday}/${daysStr}/${monthsStr}/${year}`;
  }

  convertDateTime(inputString: string, type: string): string {
    // Parse the input string
    const [, time, day, month, year] = inputString.match(/(\d+:\d+) - \w+, (\d+)\/(\d+)\/(\d+)/)!;

    if (type === "time") {
        // Convert time to HH:MM format
        const [hours, minutes] = time.split(":");
        return `${hours}:${minutes}`;
    } else if (type === "date") {
        // Convert date to DD/MM format
        return `${day.padStart(2, '0')}/${month.padStart(2, '0')}`;
    } else {
        // Handle invalid type
        return "Invalid type. Please provide 'time' or 'date'.";
    }
  }
  
  convertMoney(num: number) {
    if (num > 1000) {
      // Convert the number to a string with commas as thousands separators
      let numString = (num / 1000).toLocaleString('en-US', { minimumFractionDigits: 3, maximumFractionDigits: 3 });
      
      // Replace commas with dots
      numString = numString.replace(/,/g, '.');

      // Append '.000' for consistency with your original implementation
      return numString;
    }
    return num.toString(); // Convert to string
  } 
}
