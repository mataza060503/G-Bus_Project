import { Component } from '@angular/core';
import { BookedTicket } from '../../../models/ticket';
import { DataService } from '../../../services/Data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-passenger-info',
  templateUrl: './passenger-info.component.html',
  styleUrl: './passenger-info.component.scss'
})
export class PassengerInfoComponent {

  departureTicket!: BookedTicket
  returnTicket!: BookedTicket

  constructor(private service: DataService, private router: Router) {
    const dStr = localStorage.getItem("departureTicket")
    const rStr = localStorage.getItem("returnTicket")
    if (dStr != null) {
      this.departureTicket = JSON.parse(dStr)
    }
    if (rStr != null) {
      this.returnTicket = JSON.parse(rStr)
    }
    console.log(this.departureTicket)
    console.log(this.returnTicket)
  }

  navigate(path: string) {
    this.router.navigate([path])
  }

  ///** Other functions */
  convertMoney(num: number) {
    if (num > 1000) {
      return num/1000 + ".000"
    }
    return num
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

  formatDate(dateInput: string | Date, type:number): string {
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
    const dayOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()];


    if (type === 1 ) {
      return `${day}/${month}/${year}`;
    } else if (type === 2) {
      return `${day}/${month}`;
    } else if (type === 3) {
      return `${dayOfWeek}, ${day}/${month}/${year}`;
    }

    // Return the formatted date string
    return `${day}/${month}/${year}`;

  }
  convertDateTime(inputString: string, type: string): string {
    // Parse the input string
    const [, time, day, month, year] = inputString.match(/(\d+:\d+) - (\w+), (\d+)\/(\d+)\/(\d+)/)!;

    if (type === "time") {
        // Convert time to HH:MM format
        const [hours, minutes] = time.split(":");
        return `${hours}:${minutes}`;
    } else if (type === "date") {
        // Convert date to DD/MM format
        return `${day}/${month}`;
    } else {
        // Handle invalid type
        return "Invalid type. Please provide 'time' or 'date'.";
    }
  }
  ///////////////////////////////////////////////////////////////////////////////////////////////////
}
