import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RawOrderTicket, OrderTicketLoaded, Invoice } from '../../../models/ticket';
import { DataService } from '../../../services/Data.service';

@Component({
  selector: 'app-choose-cancel-reason',
  templateUrl: './choose-cancel-reason.component.html',
  styleUrl: './choose-cancel-reason.component.scss'
})
export class ChooseCancelReasonComponent {
  errMessage: string = ""

  order!: RawOrderTicket
  orderData!: OrderTicketLoaded
  invoice!: Invoice

  tripType: string = ""
  reason: string = ""
  isPopup: boolean = false

  constructor(private dataService: DataService, private router: Router) {
    const orderId = localStorage.getItem("orderId")

    this.initializeInvoice()
    this.InitializeOrderData()

    if (orderId != null) {
      this.loadOrderData(orderId)
      if (this.orderData.Return.Ticket === "") {
        this.tripType = "One-way-trip"
      } else {
        this.tripType = "Round-trip"
      }
    }
  }

  loadInvoice(invoiceId: string) {
    if (this.isValidId(invoiceId)) {
      this.dataService.getInvoice(invoiceId).subscribe({
        next: (data) => {
          this.invoice = data
          console.log(this.invoice)
        }, error: (err) => {
          this.errMessage = err
        }
      })
    } else {
      console.log("invalid invoiceId")
    }
  }

  loadOrderData(orderId: string) {
    if (this.isValidId(orderId)) {
      this.dataService.getOrderUnPaid(orderId).subscribe({
        next: (data) => {
          this.order = data
          console.log(data)

          this.orderData.BookedTime = this.order.BookedTime
          this.orderData.CustomerId = this.order.CustomerId
          this.orderData._id = this.order._id
          this.orderData.PassengerInfo = this.order.PassengerInfo
          this.orderData.TransactionNumber = this.order.TransactionNumber

          this.loadInvoice(this.order.TransactionNumber.toString())
          
          if (this.isValidId(this.order.Departure.toString())) {
            this.dataService.getBookedTicket(this.order.Departure.toString()).subscribe({
              next: (data) => {
                this.orderData.Departure = data;
                this.dataService.getTicket(this.orderData.Departure.Ticket).subscribe({
                  next: (data) => {
                    this.orderData.DepartImage = data.Image
                    this.dataService.getBus(data.Bus).subscribe({
                      next: (data) => {
                        this.orderData.DepartBusType = data
                      }
                    })
                  }
                })
              },
              error: (err) => {
                console.error('Failed to load departure ticket data', err);
              }
            });
          }
  
          if (this.isValidId(this.order.Return.toString())) {
            this.dataService.getBookedTicket(this.order.Return.toString()).subscribe({
              next: (data) => {
                this.orderData.Return = data;
                if (this.orderData.Return.Ticket !== "") {
                  this.dataService.getTicket(this.orderData.Return.Ticket).subscribe({
                    next: (data) => {
                      this.orderData.ReturnImage = data.Image
                      this.dataService.getBus(data.Bus).subscribe({
                        next: (data) => {
                          this.orderData.ReturnBusType = data
                        }
                      })
                    }
                  })
                }
              },
              error: (err) => {
                console.error('Failed to load departure ticket data', err);
              }
            });
          }
          console.log(this.orderData)
        }, error: (err) => {
          this.errMessage = err
        }
      })
    } else {
      console.log("Invalid OrderId")
    }
  }

  backToHomepage() {
    this.router.navigate([""])
  }

  isValidId(id: string): boolean {
    return typeof id === 'string' && /^[0-9a-fA-F]{24}$/i.test(id);
  }

  calculateRefundPercentage(targetDateTimeStr: string): number {
    // Parsing the input date-time string "0:00 - Wed, 22/05/2024"
    const regex = /(\d+:\d+) - \w+, (\d+)\/(\d+)\/(\d+)/;
    const match = targetDateTimeStr.match(regex);

    if (!match) {
        console.error("Invalid date format");
        return 0;  // Handle invalid format gracefully
    }

    const [_, time, day, month, year] = match;
    const [hours, minutes] = time.split(':').map(Number);

    // Construct a Date object from the parsed parts
    const targetDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day), hours, minutes);

    // Calculate the time difference in milliseconds
    const now = new Date();
    const timeDiff = targetDate.getTime() - now.getTime();

    // Convert time difference from milliseconds to hours
    const hoursDiff = timeDiff / (1000 * 60 * 60);

    // Determine the refund percentage based on the time difference
    if (hoursDiff > 24) {
        return 100;
    } else if (hoursDiff <= 24 && hoursDiff > 12) {
        return 50;
    } else if (hoursDiff <= 12 && hoursDiff > 6) {
        return 30;
    } else if (hoursDiff <= 6) {
        return 0;
    }

    return 0;
  }


  confirm() {
    if (this.reason === "") {
      return
    }

    const cancellation = {
      "Percentage": this.calculateRefundPercentage(this.orderData.Departure.DTime),
      "Reason": this.reason,
      "TimeOfCancel": new Date(),
    }

    this.dataService.patchCancellation(this.orderData._id, cancellation).subscribe(data => {
      console.log(data)
      if (data) {
        this.router.navigate(["cancel_success"])
        this.cancelPopup()
      } else {
        alert("some thing went wrong")
        window.location.reload()
      }
      
    })
  }

  openCancelPopup() {
    this.isPopup = true
  }
  cancelPopup() {
    this.isPopup = false
  }
  
  selectReason(reason: string) {
    this.reason = reason
  }

  convertDateTime(inputString: string, type: string): string {
    if (inputString !== "") {
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
    } else {
      return "invalid input"
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

  initializeInvoice() {
    this.invoice = {
      _id: "",
      timeOfPayment: "",
      paymentMethod: "",
      paymentStatus: "",
      subtotal: 0,
      discount: 0
    }
  }

  InitializeOrderData() {
    this.orderData = {
      _id: this.order?._id || '',  
      PassengerInfo: this.order?.PassengerInfo || {
        Account: '',
        FullName: '',
        PhoneNumber: '',
        Email: ''
      },
      Status: this.order?.Status || '',
      CustomerId: this.order?.CustomerId || '',
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
      BookedTime: this.order?.BookedTime || new Date(),  // Use current date as fallback
      TransactionNumber: this.order?.TransactionNumber || '',
      TimeRemaining: ''
    };
  }
}
