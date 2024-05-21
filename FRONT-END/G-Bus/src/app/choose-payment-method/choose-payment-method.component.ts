import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { DataService } from '../../services/Data.service';
import { Bus, Invoice, Notification, OrderTicketLoaded, PassengerInfo, PostBookedTicket, RawOrderTicket, Voucher } from '../../models/ticket';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import emailjs from '@emailjs/browser';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-choose-payment-method',
  templateUrl: './choose-payment-method.component.html',
  styleUrl: './choose-payment-method.component.scss'
})
export class ChoosePaymentMethodComponent implements OnInit{
  errMessage: string = ""
  vouchers!: Voucher[]

  order!: RawOrderTicket
  orderData!: OrderTicketLoaded

  isVoucher: boolean = false
  isValidVoucher: boolean[] = []
  discount: number = 0

  cardNumber: string = ""
  cardHolderName: string = ""
  expireDate: string = ""
  cvv: string = ""
  paymentMethod: string = "Momo"
  tripType: string = ""
  classReturn: string = ""

  invoice!: Invoice

  constructor(private dataService: DataService, private router: Router, private messageService: MessageService) {
    const orderId = localStorage.getItem("orderId")

    this.InitializeOrderData()
    this.initializeInvoice()
    this.loadAllVoucher()

    if (orderId != null) {
      this.loadOrderData(orderId)
    }
    if (orderId != null) {
      this.loadOrderData(orderId)
      if (this.orderData.Return.Ticket === "") {
        this.tripType = "One-way-trip"
        this.classReturn = "disappear"
      } else {
        this.tripType = "Round-trip"
        this.classReturn = "flex-row"
      }
    }
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  ngAfterViewInit(): void {
    this.pushNotification();
  }  

  pushNotification() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Your information has updated!' ,key:"success"});
  }

  send(email: string) {
    const templateParams = {
      to_Email: email,
      CustomerName: this.orderData.PassengerInfo.FullName,
      Trip: this.tripType,
      BusType: this.orderData.DepartBusType.Name,
      Quantity: this.orderData.Departure.Seat.length + this.orderData.Return.Seat.length + " ticket(s)",
      SeatNumbers: this.orderData.Departure.Seat.toString() + " (Departure)",
      classReturn: this.classReturn,
      SeatNumberSReturn: this.orderData.Return.Seat.toString() + " (Return)",
      PassengerName: this.orderData.PassengerInfo.FullName,
      PassengerPhone: this.orderData.PassengerInfo.PhoneNumber,
      PassengerEmail: this.orderData.PassengerInfo.Email,
      PaymentTime: this.invoice.timeOfPayment,
      TransactionNumber: this.invoice._id,
      PaymentMethod: this.invoice.paymentMethod,
      Subtotal: this.invoice.subtotal,
      Discount: this.invoice.discount,
      Total: this.invoice.subtotal - this.invoice.discount,
      orderId: this.orderData._id,
      reply_to: "gbusbookingapplication@gmail.com"
    };
    
    emailjs.send("service_vm75qui","template_6hmdil9", templateParams, {
      publicKey: '-appg8l2Q8jdcXWJl',
    }).then(
      (response) => {
        console.log('SUCCESS!', response.status, response.text);
      },
      (err) => {
        console.log('FAILED...', err);
      },
    );
  }

  loadInvoice(invoiceId: string) {
    if (this.isValidId(invoiceId)) {
      this.dataService.getInvoice(invoiceId).subscribe({
        next: (data) => {
          this.invoice = data
          if (this.invoice.paymentStatus === "Successful") {
            this.send(this.orderData.PassengerInfo.Email)
          }
        }, error: (err) => {
          this.errMessage = err
        }
      })
    } else {
      console.log("invalid invoiceId")
    }
  }

  loadAllVoucher() {
    this.dataService.getAllVoucher().subscribe({
      next: (data) => {
        this.vouchers = data
      }, error: (err) => {
        this.errMessage = err
      }
    })
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

  selectVoucher(voucher: Voucher) {
    this.isVoucher = true
    const percentage = voucher.percentage.split("%")[0]
    this.discount = ((this.orderData.Departure.Subtotal + this.orderData.Return.Subtotal)*parseInt(percentage))/100
  }
  selectPaymentMethod(method: string) {
    this.paymentMethod = method
  }

  payNow() {
    const invoice: Invoice = {
        _id: "", 
        timeOfPayment: this.formatDateToCustomString(new Date()),
        paymentMethod: this.paymentMethod,
        paymentStatus: "Pending",
        subtotal: this.orderData.Departure.Subtotal + this.orderData.Return.Subtotal - this.discount,
        discount: this.discount
    };

    this.dataService.postInvoice(this.orderData._id, invoice).subscribe({
      next: (data) => {
        console.log(data)
        if (this.isValidId(data)) {
          this.postPayment(data)
          this.loadInvoice(data)
          localStorage.setItem("orderId", this.orderData._id)
          this.router.navigate(["postPayment"])
        } else {
          console.log("invalid invoiceId")
        }
      }, error: (err) => {
        this.errMessage = err
      }
    })
  }

  postPayment(invoiceId: string) {
    const successNotification: Notification = {
      UserId: this.orderData.CustomerId,
      Type: "success",
      Time: new Date(),
      Title: "Your ticket is successful verified!",
      Message: "Your ticket from " + this.orderData.Departure.DLocation + " to " + this.orderData.Departure.ALocation + " has been confirmed by the system. View to see details.",
      isRead: false
    }
    const unsuccessNotification: Notification = {
      UserId: this.orderData.CustomerId,
      Type: "unsuccess",
      Time: new Date(),
      Title: "Your payment is unsuccessful!",
      Message: "Your seat(s) has be held for 15 minutes, please retry to payment or contact to us for support",
      isRead: false
    }

    if (this.paymentMethod === "Momo") {
      this.dataService.patchInvoice(this.orderData._id, invoiceId, "successful").subscribe({
        next: (data) => {
          this.dataService.postNotification(successNotification).subscribe()
        } 
      })
    } else {

      if (this.paymentMethod === "Mastercard") {
        const cardNumberRegex = /^(?:\d{4}-){3}\d{4}|\d{16}$/;
        const cvvRegex = /^\d{3,4}$/;
        const expiryDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/
        const isCardNumberValid = cardNumberRegex.test(this.cardNumber);
        const isCvvValid = cvvRegex.test(this.cvv);
        const isExpiryDateValid = expiryDateRegex.test(this.expireDate);
        if (this.cardNumber === "" || this.cardHolderName === "" || this.expireDate === "" || this.cvv === "") {
          alert("Please input card infomation")
          return
        } else if (!isCardNumberValid) {
          alert("Card number is invalid")
          return
        } else if (!isCvvValid) {
          alert("CVV is invalid")
          return
        } else if (!isExpiryDateValid) {
          alert("Expire date is invalid")
          return
        }
      } 
      this.dataService.patchInvoice(this.orderData._id, invoiceId, "unsuccessful").subscribe({
        next: (data) => {
          this.dataService.postNotification(unsuccessNotification).subscribe()
        } 
      })
    }
  }

  

  checkValidVoucher(voucher: Voucher) {
    const total = this.orderData.Departure.Subtotal + this.orderData.Return.Subtotal
    if (voucher.condition_value == null) {
      return false
    }
    if (total > voucher.condition_value) {
      return false
    } else {
      return true
    }
  }

  isValidId(id: string): boolean {
    return typeof id === 'string' && /^[0-9a-fA-F]{24}$/i.test(id);
  }

  convertDateTime(inputString: string, type: string): string {
  if (!inputString) {
    console.error('Invalid input string:', inputString);
    return 'Invalid input'; // Or handle it in another appropriate way
  }
  const match = inputString.match(/(\d+:\d+) - \w+, (\d+)\/(\d+)\/(\d+)/);
  if (!match) {
    console.error('Input string does not match expected format:', inputString);
    return 'Invalid format'; // Or handle this case appropriately
  }

  const [, time, day, month, year] = match;

  if (type === "time") {
    const [hours, minutes] = time.split(":");
    return `${hours}:${minutes}`;
  } else if (type === "date") {
    return `${day.padStart(2, '0')}/${month.padStart(2, '0')}`;
  } else {
    return "Invalid type. Please provide 'time' or 'date'.";
  }
}

  formatDateToCustomString(dateInput: Date) {
    const options: Intl.DateTimeFormatOptions = {
      month: 'short',    // "short" for abbreviated month name (e.g., Feb)
      day: '2-digit',    // "2-digit" for two-digit day
      year: 'numeric',   // "numeric" for the full year
      hour: '2-digit',   // "2-digit" for two-digit hour
      minute: '2-digit', // "2-digit" for two-digit minutes
      hour12: true       // Use 12-hour time format (AM/PM)
    };
  
    // Convert dateInput to a Date object to ensure compatibility
    const date = new Date(dateInput);
  
    // Use toLocaleString to format the date with specified options
    let formattedDate = date.toLocaleString('en-US', options);
  
    // Format the string to replace the first comma with " at"
    formattedDate = formattedDate.replace(',', ' at');
  
    return formattedDate;
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

  count(arr: any[]): number {
    return (arr ?? []).length;
  }

  private offcanvasService = inject(NgbOffcanvas)
  openStaticBackdrop(content: TemplateRef<any>) {
		this.offcanvasService.open(content, { position: 'end' , backdrop: 'static', panelClass: "custom-panel" });
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
