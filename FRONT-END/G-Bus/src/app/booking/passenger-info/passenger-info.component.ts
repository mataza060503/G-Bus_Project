import { Component, TemplateRef, inject } from '@angular/core';
import { BookedTicket, Notification, OrderTicket, PassengerInfo, Point, PostBookedTicket } from '../../../models/ticket';
import { DataService } from '../../../services/Data.service';
import { Router } from '@angular/router';

import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-passenger-info',
  templateUrl: './passenger-info.component.html',
  styleUrl: './passenger-info.component.scss'
})
export class PassengerInfoComponent {
  errMessage: string = ""

  departureTicket!: BookedTicket
  returnTicket!: BookedTicket
  passengerInfo!: PassengerInfo
  userId: string = ""

  ///** Passenger Variables */
  psgName: string = ""
  psgPhone: string = ""
  psgMail: string = ""

  constructor(private service: DataService, private router: Router) {
    this.initializeTickets()
    const dStr = localStorage.getItem("departureTicket")
    const rStr = localStorage.getItem("returnTicket")
    if (dStr != null) {
      this.departureTicket = JSON.parse(dStr)
    }
    if (rStr != null) {
      this.returnTicket = JSON.parse(rStr)
    }
    const userIdRaw = localStorage.getItem("token")
    if (userIdRaw != null) {
      const userId = userIdRaw.replace(/"/g,'');
      this.userId = userId
    }

    this.passengerInfo = {
      Account:"",
      FullName:"",
      PhoneNumber: "",
      Email: ""
    }

    console.log(this.departureTicket)
    console.log(this.returnTicket)
  }

  initializeTickets() {
    this.departureTicket = {
      Ticket: "",
      Date: "",
      State: "",
      Seat: [],
      Subtotal: 0,
      PickUpLocation: {  
        Point: "",
        Address: "",
        ShuttleBus: false,
        Time: 0
      } as Point,
      DropOffLocation: { 
        Point: "",
        Address: "",
        ShuttleBus: false,
        Time: 0
       } as Point,
      PickUpTime: "",
      DropOffTime: "",
      Status: "unpaid",
      Passenger: {} as PassengerInfo,
      BusType: "",
      DLocation: "",
      ALocation: "",
      Image: "",
      PickUpPoints: [],
      DropOffPoints: []
    }
    this.returnTicket = {
      Ticket: "",
      Date: "",
      State: "",
      Seat: [],
      Subtotal: 0,
      PickUpLocation: {
        Point: "",
        Address: "",
        ShuttleBus: false,
        Time: 0
      },
      DropOffLocation: { 
        Point: "",
        Address: "",
        ShuttleBus: false,
        Time: 0
       } as Point,
      PickUpTime: "",
      DropOffTime: "",
      Status: "unpaid",
      Passenger: {} as PassengerInfo,
      BusType: "",
      DLocation: "",
      ALocation: "",
      Image: "",
      PickUpPoints: [],
      DropOffPoints: []
    }
  }

  navigate(path: string) {
    this.router.navigate([path])
  }

  ///** Main Functions */
  continue() {
    if (this.psgName === "" || this.psgPhone === "" || this.psgMail === "") {
      alert("Please fill the passenger information");
      return;
    } else if (this.psgPhone != "") {
        // Regex for a general US phone number format
        var phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        if (!phoneRegex.test(this.psgPhone)) {
            alert("Please enter a valid phone number.");
            return;
        }
    } else if (this.psgMail != "") {
        // Simple regex for email validation
        var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailRegex.test(this.psgMail)) {
            alert("Please enter a valid email address.");
            return;
        }
    }
    this.passengerInfo = {
      Account: this.userId,
      PhoneNumber: this.psgPhone,
      Email: this.psgMail,
      FullName: this.psgName
    }
    const order:OrderTicket = {
      PassengerInfo: this.passengerInfo,
      Departure: "",
      Return: "",
      Status: "Unpaid",
      CustomerId: this.userId,
      BookedTime: new Date(),
      TransactionNumber: ""
    }
    const postDeparture:PostBookedTicket = {
      Ticket: this.departureTicket.Ticket,
      DLocation: this.departureTicket.DLocation,
      ALocation: this.departureTicket.ALocation,
      DTime: this.departureTicket.PickUpTime,
      ATime: this.departureTicket.DropOffTime,
      Date: this.departureTicket.Date,
      State:this.departureTicket.State,
      Seat:this.departureTicket.Seat,
      Subtotal:this.departureTicket.Subtotal,
      PickUpLocation:this.departureTicket.PickUpLocation,
      DropOffLocation:this.departureTicket.DropOffLocation,
    }
    const postReturn:PostBookedTicket = {
      Ticket: this.returnTicket.Ticket,
      DLocation: this.returnTicket.DLocation,
      ALocation: this.returnTicket.ALocation,
      DTime: this.returnTicket.PickUpTime,
      ATime: this.returnTicket.DropOffTime,
      Date: this.returnTicket.Date,
      State: this.returnTicket.State,
      Seat: this.returnTicket.Seat,
      Subtotal: this.returnTicket.Subtotal,
      PickUpLocation: this.returnTicket.PickUpLocation,
      DropOffLocation: this.returnTicket.DropOffLocation,
    }
    const notification: Notification = {
      UserId: this.userId,
      Type: "success",
      Time: new Date(),
      Title: "Your ticket is successful booked!",
      Message: "Your seat(s) has be held for 15 minutes, please make payment to confirm order",
      isRead: false
    }
    this.service.postBookedTickets(postDeparture).subscribe({
      next: (data) => {
        order.Departure = data
        this.service.postBookedTickets(postReturn).subscribe({
          next: (data) => {
            order.Return = data
            this.service.postOrder(order).subscribe({
              next: (data) => {
                localStorage.setItem("orderId",data.insertedId)
                this.service.postNotification(notification).subscribe(data => {
                  this.router.navigate(["payment"])
                })
              }, error: (err) => {
                this.errMessage = err
              }
            })
          }, error: (err) => {
            this.errMessage = err
          }
        })
      }, error: (err) => {
        this.errMessage = err
      }
    })
    
    
  }

  editPickPoint(point: Point) {
    this.departureTicket.PickUpLocation = point
  }
  editDropPoint(point: Point) {
    this.departureTicket.DropOffLocation = point
  }
  editReturnPickPoint(point: Point) {
    this.returnTicket.PickUpLocation = point
  }
  editReturnDropPoint(point: Point) {
    this.returnTicket.DropOffLocation = point
  }
  private offcanvasService = inject(NgbOffcanvas)
  openStaticBackdrop(content: TemplateRef<any>) {
		this.offcanvasService.open(content, { position: 'end' , backdrop: 'static', panelClass: "custom-panel" });
	}

  ///** Other functions */
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

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  ///** Date functions */

  calculateTimePoint(timeStr: string, timeGap: number) {
    const time = timeStr.split(":")
    const timeData = parseInt(time[0])*60 + parseInt(time[1])
    var resultTime = timeData + timeGap
    if (resultTime < 0) {
      resultTime += 24*60
    } 
    const hours  = Math.floor(resultTime/60)
    const minutes = resultTime%60

    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`; 
  }

  calculateDatePoint(dateStr:string, timeStr: string, timeGap: number) {
    const time = timeStr.split(":")
    const timeData = parseInt(time[0])*60 + parseInt(time[1])
    var resultTime = timeData + timeGap
    let date = this.parseDateString(dateStr)
    if (resultTime < 0) {
      if (date != null) {
        return this.formatDate(new Date(date.getTime() - 86400000),2);
      }
    } 
    return this.formatDate(date+"",2)
  }

  parseDateString(dateString: string): Date | null {
    const [dayStr, monthStr, yearStr] = dateString.split('/');
    const day: number = parseInt(dayStr, 10);
    const month: number = parseInt(monthStr, 10) - 1; // Adjust month index (JavaScript months are 0-indexed)
    const year: number = parseInt(yearStr, 10);

    // Check if the parsed values are valid
    if (isNaN(day) || isNaN(month) || isNaN(year)) {
        console.error('Invalid date string format');
        return null;
    }

    // Create and return a Date object
    return new Date(year, month, day);
  }

  formatDate(dateInput: string | Date, type: number): string {
    let date;

    // Explicitly parse the input if it's a string in "DD/MM/YYYY" format
    if (typeof dateInput === 'string') {
        const parts = dateInput.split('/');
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1; // Adjust month index (JavaScript months are 0-indexed)
        const year = parseInt(parts[2], 10);
        date = new Date(year, month, day);
    } else {
        date = dateInput;
    }

    // Check if the date is valid
    if (isNaN(date.getTime())) {
        return 'Invalid Date';
    }

    // Get day, month, and year components
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Note: Months are zero-based
    const year = date.getFullYear();
    const dayOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()];

    switch (type) {
        case 1:
            return `${day}/${month}/${year}`;
        case 2:
            return `${day}/${month}`;
        case 3:
            return `${dayOfWeek}, ${day}/${month}/${year}`;
        default:
            return `${day}/${month}/${year}`; // Fallback to full date
    }
}

  convertDateTime(inputString: string, type: string): string {
    if (!inputString) {
        console.error('Input string is null or undefined.');
        return 'Input string is invalid';
    }

    const match = inputString.match(/(\d+:\d+) - \w+, (\d+)\/(\d+)\/(\d+)/);
    if (!match) {
        return 'Input format is invalid';
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

  ///////////////////////////////////////////////////////////////////////////////////////////////////
}
