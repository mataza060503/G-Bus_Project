import { retry } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { RawOrderTicket, OrderTicketLoaded, Invoice, Notification } from '../../models/ticket';
import { DataService } from '../../services/Data.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-succesful-payment',
  templateUrl: './succesful-payment.component.html',
  styleUrl: './succesful-payment.component.scss'
})
export class SuccesfulPaymentComponent implements OnInit{
  errMessage: string = ""

  order!: RawOrderTicket
  orderData!: OrderTicketLoaded
  invoice!: Invoice

  tripType: string = ""

  constructor(private dataService: DataService, private router: Router, private messageService: MessageService) {
    const orderId = localStorage.getItem("orderId")

    this.initializeInvoice()
    this.InitializeOrderData()
    this.pushNotification()

    if (orderId != null) {
      this.loadOrderData(orderId)
      if (this.orderData.Return.Ticket === "") {
        this.tripType = "One-way-trip"
      } else {
        this.tripType = "Round-trip"
      }
    }
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  ngAfterViewInit(): void {
  }  

  pushNotification() {
    if (this.invoice.paymentStatus === "Successful") {
      const notification: Notification = {
        UserId: this.orderData.CustomerId,
        Type: "success",
        Time: new Date(),
        Title: "Your ticket is successful verified!",
        Message: "Your ticket from " + this.orderData.Departure.DLocation + " to " + this.orderData.Departure.ALocation + " has been confirmed by the system. View to see details.",
        isRead: false
      }
      this.messageService.add({key:"success"});
      this.dataService.postNotification(notification)
    } else {
      const notificationFail: Notification = {
        UserId: this.orderData.CustomerId,
        Type: "error",
        Time: new Date(),
        Title: "Your payment is unsuccessful!",
        Message: "Your seat(s) has be held for 15 minutes, please retry to payment or contact to us for support",
        isRead: false
      }
      this.dataService.postNotification(notificationFail)
      this.messageService.add({key:"error"});
    }
  }


  loadInvoice(invoiceId: string) {
    if (this.isValidId(invoiceId)) {
      this.dataService.getInvoice(invoiceId).subscribe({
        next: (data) => {
          this.invoice = data
          this.dataService.checkExistOrder(this.orderData._id).subscribe(data=> {
            alert(data)
            if (data) {
              return
            } else {
              this.pushNotification();
            }
          })
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

  retry() {
    this.router.navigate(["payment"])
  }

  isValidId(id: string): boolean {
    return typeof id === 'string' && /^[0-9a-fA-F]{24}$/i.test(id);
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
