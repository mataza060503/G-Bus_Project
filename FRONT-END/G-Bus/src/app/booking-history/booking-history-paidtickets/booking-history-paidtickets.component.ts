import { Component } from '@angular/core';
import { Bus, OrderTicket, OrderTicketLoaded, PostBookedTicket, RawOrderTicket } from '../../../models/ticket';
import { DataService } from '../../../services/Data.service';
import { Router } from '@angular/router';

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
  isPopup: boolean = false
  intervalIds: any[] = []; // Store interval IDs for cleanup

  isSelected: boolean[] = [true, false, false]

  constructor(private dataService: DataService, private router: Router) {
    const userIdRaw = localStorage.getItem("token")
    if (userIdRaw != null) {
      const userId = userIdRaw.replace(/"/g,'');
      this.accountId = userId
    }
    this.loadOrderData(this.accountId, "Unpaid")
  }

  payNow(order: OrderTicketLoaded) {
    localStorage.setItem("orderId", order._id)
    this.router.navigate(["payment"])
  }

  viewInvoice(order: OrderTicketLoaded) {
    localStorage.setItem("orderId", order._id)
    this.router.navigate(["postPayment"])
  }
  repurchase(order: OrderTicketLoaded) {
    const departureDateStr = order.Departure.Date.split(",")[1].trim(); // Assuming the format "Day, DD/MM/YYYY"
    const departureDateParts = departureDateStr.split("/"); // Splitting "DD/MM/YYYY" into parts

    // Creating a Date object from the parts
    const departureDate = new Date(parseInt(departureDateParts[2], 10), // Year
                                   parseInt(departureDateParts[1], 10) - 1, // Month (0-based)
                                   parseInt(departureDateParts[0], 10)); // Day

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Resetting time to start of the day

    // Check if the departure date is in the past
    if (departureDate < today) {
        alert("Ticket is expired");
    } else {
        // Navigate based on whether there is a return ticket
        if (order.Return.Ticket !== "") {
            this.router.navigate(["searchResult", order.Departure.DLocation, order.Departure.ALocation, departureDateStr, order.Return.Date.split(",")[1].trim()]);
        } else {
            // Here, you might want to handle what happens if no condition is set (you have 'if (condition)' with no content)
            this.router.navigate(["searchResult", order.Departure.DLocation, order.Departure.ALocation, departureDateStr, ""]);
        }
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
            Departure: {
              Ticket: '',
              DLocation: '',
              ALocation: '',
              DTime: '',
              ATime: '',
              Date: '',
              State: '',
              Seat: [],
              Subtotal: 0,
              PickUpLocation: {
                Point: '',
                Address: '',
                Time: 0,
                ShuttleBus: false
              },
              DropOffLocation: {
                Point: '',
                Address: '',
                Time: 0,
                ShuttleBus: false
              }
            },
            DepartImage: '',
            DepartBusType: {
              _id: '',
              Name: '',
              Image: [],
              Tag: [],
              Description: '',
              Seat: 0
            },
            Return: {
              Ticket: '',
              DLocation: '',
              ALocation: '',
              DTime: '',
              ATime: '',
              Date: '',
              State: '',
              Seat: [],
              Subtotal: 0,
              PickUpLocation: {
                Point: '',
                Address: '',
                Time: 0,
                ShuttleBus: false
              },
              DropOffLocation: {
                Point: '',
                Address: '',
                Time: 0,
                ShuttleBus: false
              }
            },
            ReturnImage: '',
            ReturnBusType: {
              _id: '',
              Name: '',
              Image: [],
              Tag: [],
              Description: '',
              Seat: 0
            },
            BookedTime: rawOrder.BookedTime,
            TransactionNumber: rawOrder.TransactionNumber,
          };
          if (this.isValidId(rawOrder.Departure.toString())) {
            this.dataService.getBookedTicket(rawOrder.Departure.toString()).subscribe({
              next: (data) => {
                orderData.Departure = data;
                console.log(data)
                this.startCountdown(orderData); // Start the countdown for each order
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
    let endTime: number;
  
    if (orderData.Status === "Paid" && orderData.Departure && orderData.Departure.DTime) {
      const departureDateTime = this.parseDateTime(orderData.Departure.DTime);
      endTime = departureDateTime.getTime();
      console.log("Counting to Departure Time:", orderData.Departure.DTime);
    } else {
      // Default to 15 minutes from booked time if not paid or departure time is not available
      endTime = new Date(orderData.BookedTime).getTime() + 15 * 60 * 1000;
    }
  
    const intervalId = setInterval(() => {
      const now = new Date().getTime();
      const distance = endTime - now;
  
      if (distance < 0) {
        clearInterval(intervalId);
        orderData.TimeRemaining = "Time Expired";
        if (orderData.Status === "Unpaid") {
          this.cancelOrder(orderData);
        }
      } else {
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        orderData.TimeRemaining = `${hours}h ${minutes}m ${seconds}s`;
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

  navigate(ref: string) {
    this.router.navigate([ref])
  }

  openCancelPopup() {
    this.isPopup = true
    this.router.navigate([{ outlets: { 'auth-popup': ['cancel-confirm'] } }]);
  }
  cancelPopup() {
    this.router.navigate([{ outlets: { 'auth-popup': [null] } }]);
    this.isPopup = false
  }
  confirm() {
    this.router.navigate(["cancel"])
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

  calculateStatus(departureTimeStr: string, arrivalTimeStr: string): string {
    console.log('Departure Time:', departureTimeStr); // Debug log
    console.log('Arrival Time:', arrivalTimeStr); // Debug log
  
    if (!departureTimeStr || !arrivalTimeStr) {
      console.error('One or both date strings are undefined or empty');
      return 'Data Error'; // Or handle this situation appropriately
    }
  
    const currentDate = new Date();
    const departureDateTime = this.parseDateTime(departureTimeStr);
    const arrivalDateTime = this.parseDateTime(arrivalTimeStr);
  
    if (currentDate < departureDateTime) {
      return 'Upcoming';
    } else if (currentDate >= departureDateTime && currentDate <= arrivalDateTime) {
      return 'Ongoing';
    } else {
      return 'Completed';
    }
  }
  

  parseDateTime(dateTimeStr: string): Date {
    // The expected format is "0:30 - Wed, 22/05/2024"
    // This regex extracts time, day, date, month, and year from the string.
    const regex = /(\d+:\d+) - \w+, (\d+)\/(\d+)\/(\d+)/;
    const match = dateTimeStr.match(regex);
  
    if (!match) {
      throw new Error('Invalid date time format');
    }
  
    const [_, time, day, month, year] = match;
    const [hours, minutes] = time.split(':').map(Number);
  
    // Create a new Date object using extracted values
    const date = new Date();
    date.setFullYear(Number(year), Number(month) - 1, Number(day));
    date.setHours(hours, minutes, 0, 0);  // Set hours and minutes, reset seconds and milliseconds
  
    return date;
  }
  
  

  convertDateTime(inputString: string, type: string): string {
    if (!inputString) {
      return 'Invalid input'; // Return or handle error appropriately
    }
  
    const matchResult = inputString.match(/(\d+:\d+) - \w+, (\d+)\/(\d+)\/(\d+)/);
    if (!matchResult) {
      return 'Format error'; // Handle the error case appropriately
    }
  
    const [, time, day, month, year] = matchResult;
  
    if (type === "time") {
      const [hours, minutes] = time.split(":");
      return `${hours}:${minutes}`;
    } else if (type === "date") {
      return `${day.padStart(2, '0')}/${month.padStart(2, '0')}`;
    } else {
      return "Invalid type. Please provide 'time' or 'date'.";
    }
  }
  

  formatDate(dateInput: string | Date): string {
    // If the input is a string, convert it to a Date object
    const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;

    // Check if the date is valid
    if (isNaN(date.getTime())) {
        return 'Invalid Date';
    }

    // Get day, month, and year components
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Note: Months are zero-based
    const year = date.getFullYear();

    // Return the formatted date string
    return `${day}/${month}/${year}`;
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
