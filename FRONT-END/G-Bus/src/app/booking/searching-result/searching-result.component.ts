
import { Component, OnInit } from '@angular/core';
import { empty } from 'rxjs';
import { FeedbackItem, LocalData } from '../../../models/Item';
import { LocalDataService } from '../../../services/LocalData.service';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../../services/Data.service';
import { Bus, RawTicket, Ticket, Route, Amenities, Driver } from '../../../models/ticket';

@Component({
  selector: 'app-searching-result',
  templateUrl: './searching-result.component.html',
  styleUrl: './searching-result.component.scss'
})
export class SearchingResultComponent implements OnInit{
  filterToggle: boolean[] = [];
  isDropdownOpen: boolean[] = [];
  isSteperOpen: boolean[] = [];
  isContinue: boolean[] = [];

  list:string[] = ["a","b","c"]
  selectedDropdownItems: number[] = [];
  selectedSteper: number[] = []

  selectedSeat: string[][] = []
  rating: number = 1
  seat:number = 1

  pickUpPoints: string[] = ["","","","","",""]

  //Searching variables 
  errMessage: string = ""

  selectedCustomer:string = "1 Customer"
  customer:string = "2 Customers";
  busTypeSelected:string = "Double Room";
  busType:string = "Limousine Single Room";

  DLocation: any
  DLocationView: string = ""
  ALocation: any
  DDate:any
  RDate:any
  localData: LocalData = { contryPort: [], provinces: [] };

  minDate:Date;
  maxDate:Date;

  searchResult:{} = {"DLocation":"", "ALocation":"", "DDate": "", "RDate":""}
  /////////////////////////////////////////////////////////////////////////////////////////////

  /** Ticket Variables */
  tickets!: Ticket[]
  rawTicket!: RawTicket[]

  reviewsCopy: FeedbackItem[][] = []

  reviewsPerPage: number = 3; // Number of reviews to display per page
  currentPage: number[] = []; // Current page index

  

  /////////////////////////////////////////////////////////////////////////////////////////////

  constructor(private localDataService:LocalDataService, private dataService: DataService, private activatedRoute:ActivatedRoute) {
    this.localDataService.getLocalData().subscribe(data => {
      this.localData = data
    })
    this.loadDataIntoSearchBar()
    this.loadTicketData()
    this.tickets = []
    const currentDate = new Date();
    this.minDate = currentDate
    this.maxDate = new Date(currentDate.getTime() + 30 * 24 * 60 * 60 * 1000)
    
  }

  ngOnInit(): void {
    for (let i = 0; i < 3; i++) {
      this.isDropdownOpen.push(false);
    }
    for (let i = 0; i < 2; i++) {
      this.isSteperOpen.push(false)
    }
    for (let i = 0; i < 3; i++) {
      this.filterToggle.push(false);
    }
    for (let i = 0; i < this.list.length; i++) {
      this.isContinue.push(false)
    }
    for (let i = 0; i < 4; i++) {
      this.selectedDropdownItems.push(1);
    }
    for (let i = 0; i < 3; i++) {
      this.selectedSteper.push(1)
    }
    for (let i = 0; i < this.list.length; i++) {
      this.selectedSeat.push([])
    }
    this.dropdownController()
  }

  //Ticket data process

  loadTicketData() {
    this.dataService.getRawTicket(this.DLocation, this.ALocation, this.formatDate(this.DDate,1)).subscribe({
      next: (data: RawTicket[]) => {
        this.rawTicket = data;
        console.log(this.rawTicket);
  
        // Initialize tickets array
        this.tickets = [];
  
        // Iterate over raw tickets
        for (let i = 0; i < this.rawTicket.length; i++) {
          const ticket = this.rawTicket[i];
          this.currentPage.push(1)
          this.selectedSteper.push(1)
          
          // Create a new Ticket object
          const newTicket: Ticket = {
            Ticket: ticket,
            Route: {} as Route,
            Reviews: [],
            Amenities: [],
            Bus: {} as Bus,
            Driver: []
          };
  
          // Retrieve route data
          this.dataService.getRouteWithPoints(ticket.Route).subscribe({
            next: (routeData: Route) => {
              newTicket.Route = routeData;
              //console.log(routeData);
            }
          });
  
          // Retrieve reviews data
          this.dataService.getReviews(ticket.Reviews).subscribe({
            next: (reviewsData: FeedbackItem[]) => {
              newTicket.Reviews = reviewsData;
              this.reviewsCopy.push(reviewsData)
              //console.log(reviewsData);
            }
          });
  
          // Retrieve bus data
          this.dataService.getBus(ticket.Bus).subscribe({
            next: (busData: Bus) => {
              newTicket.Bus = busData;
              //console.log(busData);
            }
          });
  
          // Retrieve amenities data
          this.dataService.getAmenities(ticket.Amenities).subscribe({
            next: (amenitiesData: Amenities[]) => {
              newTicket.Amenities = amenitiesData;
              //console.log(amenitiesData);
            }
          });

          // Retrieve driver data
          this.dataService.getDrivers(ticket.Driver).subscribe({
            next: (driversData: Driver[]) => {
              newTicket.Driver = driversData;
              //console.log(amenitiesData);
            }
          });
  
          // Push the new ticket to the tickets array
          this.tickets.push(newTicket);
          
        }
        console.log(this.tickets)
        
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  checkSeatAvailable(ticket: Ticket, seat:string) {
    for (let i = 0; i < ticket.Ticket.Seat.length; i++) {
      const check = ticket.Ticket.Seat[i];
      if (check === seat) {
        return true
      }
    }
    return false
  }
  checkShuttleBus(check: boolean) {
    return check
  }

  /**Bus Carousel */
  slideConfig = {
    "slidesToShow": 3, 
    "slidesToScroll": 1, 
    "autoplay":true,
    "infinite": true
  };

  addSlide() {
    
  }
  
  removeSlide() {
    
  }

  slickInit(e: any) {
    
  }
  
  breakpoint(e: any) {
    
  }
  
  afterChange(e: any) {
    
  }
  
  beforeChange(e: any) {
    
  }

  getCurrentPageReviews(ticket:Ticket, index: number): any[] {
    const startIndex = (this.currentPage[index] - 1) * this.reviewsPerPage;
    const endIndex = startIndex + this.reviewsPerPage;
    return ticket.Reviews.slice(startIndex, endIndex)
  }

  getPageNumbers(ticket:Ticket): number[] {
    const pageCount = Math.ceil(ticket.Reviews.length / this.reviewsPerPage);
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }

  previousPage(index:number): void {
    if (this.currentPage[index] > 1) {
      this.currentPage[index]--;
    }
  }

  nextPage(ticket:Ticket, index: number): void {
    const pageCount = Math.ceil(ticket.Reviews.length / this.reviewsPerPage);
    if (this.currentPage[index] < pageCount) {
      this.currentPage[index]++;
    }
  }

  goToPage(pageNumber: number, index: number): void {
    this.currentPage[index] = pageNumber;
  }

  filterReviews(ticket: Ticket, filter: string,index: number) {
    ticket.Reviews = this.reviewsCopy[index]
    var filtered: FeedbackItem[] = []
    const currentDate = new Date()
    //console.log(currentDate)
    const recentDate = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000)
    //console.log(recentDate)
    for (let i = 0; i < ticket.Reviews.length; i++) {
      const review = ticket.Reviews[i];
      
      if (filter === "Recent") {
        const date = this.parseDateAndTimeString(review.Date)
        
        if (date && date > recentDate) {
          filtered.push(review)
        }
      }
      if (filter === "With Photos") {
        if (review.Image.length > 0) {
          filtered.push(review)
        }
      }
      if (filter === "With Reviews") {
        if (review.Feedback !== "") {
          filtered.push(review)
        }
      }
      
    }
    if (filter === "All") {
      // Sort reviews by date in descending order
        ticket.Reviews.sort((a, b) => {
          const dateA = this.parseDateAndTimeString(a.Date);
          const dateB = this.parseDateAndTimeString(b.Date);
          if (dateA && dateB) {
              return dateB.getTime() - dateA.getTime(); // Reversed comparison
          }
          return 0;
        });

      // Add sorted reviews to the filtered array
      filtered = ticket.Reviews.slice();
    }
    if (filter === "Oldest") {
      // Sort reviews by date in ascending order
      ticket.Reviews.sort((a, b) => {
          const dateA = this.parseDateAndTimeString(a.Date);
          const dateB = this.parseDateAndTimeString(b.Date);
          if (dateA && dateB) {
              return dateA.getTime() - dateB.getTime();
          }
          return 0;
      });

      // Add sorted reviews to the filtered array
      filtered = ticket.Reviews.slice();
    }
    ticket.Reviews = filtered
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  

  //Date Functions
  parseDateAndTimeString(dateStr: string) {
    const [datePart, timePart] = dateStr.split(' ');
    const [day, month, year] = datePart.split('/').map(Number);
    const [hour, minute] = timePart.split(':').map(Number);

    const date = new Date(year, month - 1, day, hour, minute);
        
    // Validate the parsed date
    if (
      date.getDate() === day &&
      date.getMonth() === month - 1 &&
      date.getFullYear() === year &&
      date.getHours() === hour &&
      date.getMinutes() === minute
    ) {
      return date;
    } else {
      console.error("Invalid date format");
      return null;
    }
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

    if (type === 1 ) {
      return `${day}/${month}/${year}`;
    }
    if (type === 2) {
      return `${day}/${month}`;
    }

    // Return the formatted date string
    return `${day}/${month}/${year}`;
  }

  timeDifference(time1Str: string, time2Str: string): string {
    // Parse the input strings into Date objects
    const timeFormat = /(\d{1,2}):(\d{2})/;
    const [, hours1, minutes1] = time1Str.match(timeFormat)!;
    const [, hours2, minutes2] = time2Str.match(timeFormat)!;
    const time1 = parseInt(hours1) * 60 + parseInt(minutes1);
    const time2 = parseInt(hours2) * 60 + parseInt(minutes2);

    // Calculate the time difference
    let difference = time2 - time1;
    if (difference < 0) difference += 24 * 60; // If the difference is negative, add 24 hours

    // Convert the time difference to hours and minutes
    const hours = Math.floor(difference / 60);
    const minutes = difference % 60;

    return `${hours}h${minutes < 10 ? '0' : ''}${minutes}`;
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////

  //Searching bar
  loadDataIntoSearchBar() {
    this.activatedRoute.paramMap.subscribe((param)=> {
      this.DLocation = param.get("DLocation")
      this.ALocation = param.get("ALocation")
      var dateCheck = param.get("DDate")
      if (dateCheck != null) {
        this.DDate = this.parseDateString(dateCheck)
      }
      if (param.get("RDate") != "") {
        this.RDate = param.get("RDate")

      }
     
    })
  }
  getBusType(event: any) {
    const selected = event.target as HTMLElement;
    this.busTypeSelected = selected.textContent?.trim() || ""
  }
  getCustomer(event: any) {
    const selected = event.target as HTMLElement;
    this.selectedCustomer = selected.textContent?.trim() || ""
  }
  switch() {
    var subLocation = this.DLocation
    this.DLocation= this.ALocation
    this.ALocation = subLocation
  }
  search() {
    var searchResult = {"DLocation":this.DLocation, "ALocation":this.ALocation, "DDate": this.DDate}
    if (searchResult.DLocation !== undefined && searchResult.ALocation !== undefined && searchResult.DDate !== undefined) {
      var searchHis = []
      searchHis = JSON.parse(localStorage.getItem("his") || "[]")
      searchHis.unshift(searchResult)
      localStorage.setItem("his",JSON.stringify(searchHis))
      
    } else {
      alert("Please select your trip information")
      this.localDataService.getLocalData().subscribe(data => {
        this.localData = data
      })
    }
  }

  generateStar(time: number) {
    var stars:string[] = []
    for (let i = 0; i < time; i++) {
      stars.push("")
    }
    return stars
  }

  //Toggle controller

  showDropdown(index: number, event:any) {
    this.filterToggle[index] = !this.filterToggle[index]

    const selected = event.target as HTMLElement
    const icon = selected.querySelector("span") as HTMLElement
    if (this.filterToggle[index]) {
      icon.style.rotate = "180deg"
    } else {
      icon.style.rotate = "0deg"
    }

  }

  toggleDropdown(index: number, event: any) {
    this.isDropdownOpen[index] = !this.isDropdownOpen[index];
    this.isSteperOpen[index] = false
    
  }
  toggleSteper(index: number) {
    this.isSteperOpen[index] = !this.isSteperOpen[index]
    this.isDropdownOpen[index] = false;
  }
  dropdownController() {
    const dropdowns = document.querySelectorAll("#dropdown")
    console.log(dropdowns)
    for (let i = 0; i < this.list.length; i++) {
      var dropdownItem = dropdowns[i].querySelectorAll("ticket-item-dropdown-nav-item")
      console.log(dropdownItem)
    }
  }
  showDropdownItem(itemNumber: number, dropdownIndex: number, event:any) {
    this.selectedDropdownItems[dropdownIndex] = itemNumber;

    const target = event.target as HTMLElement;
    const parentElement = target.parentElement;
    if (parentElement) {
      const siblings = Array.from(parentElement.children);
      siblings.forEach(sibling => {
        if (sibling !== target) {
          sibling.classList.remove("active")
        } else {
          sibling.classList.add("active")
        }
      });
    }
  }
  showSteperItem(steperNumber: number, index:number) {
    this.selectedSteper[index] = steperNumber
  }
  filterRating (index: number) {
    const stars = document.querySelectorAll(".filter-filter-review")
      for (let i = 0; i < stars.length; i++) {
        const element = stars[i] as HTMLElement;
        element.style.color = "#E2E4E7"
      }
      for (let i = 0; i < index+1; i++) {
        const child = stars[i] as HTMLElement
        console.log(child)
        child.style.color = "#FFB74A"
      }
    this.rating = index + 1
    console.log(stars)
  }
  addSeat() {
    if (this.seat < 20) {
      this.seat += 1
    }
  }
  substractSeat() {
    if (this.seat > 1) {
      this.seat -= 1
    }
  }
  chooseSeat(index:number,event: any) {
    const selected = event.target as HTMLElement

    

    if (selected.className != "text body-16 reg ticket-item-booking-seat-content-item unavailable") {
      if (selected.className == "text body-16 reg ticket-item-booking-seat-content-item") {
        
        if (selected.textContent) {
          if (!this.selectedSeat[index].includes(selected.textContent)) {
            selected.classList.add("selected");
            if (selected.textContent) {
              this.selectedSeat[index].push(selected.textContent);
              console.log(this.selectedSeat);
              this.isContinue[index] = true
            }
          } 
        }
      } 
      else if (selected.className == "text body-16 reg ticket-item-booking-seat-content-item selected") {
        this.selectedSeat[index] = this.selectedSeat[index].filter(value => value !== selected.textContent);
        selected.classList.remove("selected");
        console.log(this.selectedSeat);
        if (this.selectedSeat[index].length == 0) {
          
          this.isContinue[index] = false
        }
        console.log(this.selectedSeat[index].length)
      }
    }
  }

  /** Other Functions */

  numberArrayAverage(array: number[]) {
    var sum = array.reduce((total, num) => total + num, 0);
    return Math.round(sum/array.length)
  }

  calculateRating(reviews: FeedbackItem[]) {
    var sum = 0
    for (let i = 0; i < reviews.length; i++) {
      const review = reviews[i];
      sum += review.Rating
    }
    return Math.ceil(sum/reviews.length)
  }

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

  calculateTagRating(reviews: FeedbackItem[], tag: string) {
    var FullInfomation = 0
    var VerifiedInformation = 0
    var ConvenienceComfort = 0
    var Safety = 0
    var ServiceQuality = 0
    var EmployeeAttitudes = 0
    for (let i = 0; i < reviews.length; i++) {
      const review = reviews[i];
      for (let i = 0; i < review.Tag.length; i++) {
        const tag = review.Tag[i];
        if (tag === "Full Information") {
          FullInfomation += 1
        } else if (tag === "Verified Information") {
          VerifiedInformation += 1
        } else if (tag === "Convenience & Comfort") {
          ConvenienceComfort += 1
        } else if (tag === "Safety") {
          Safety += 1
        } else if (tag === "Service Quality") {
          ServiceQuality += 1
        } else if (tag === "Employee’s Attitudes") {
          EmployeeAttitudes += 1
        }
      }
    }

    const total = reviews.length

    if (tag === "Full Information") {
      return Math.ceil((FullInfomation*100)/total)
    } else if (tag === "Verified Information") {
      return Math.ceil((VerifiedInformation*100)/total)
    } else if (tag === "Convenience & Comfort") {
      return Math.ceil((ConvenienceComfort*100)/total)
    } else if (tag === "Safety") {
      return Math.ceil((Safety*100)/total)
    } else if (tag === "Service Quality") {
      return Math.ceil((ServiceQuality*100)/total)
    } else if (tag === "Employee’s Attitudes") {
      return Math.ceil((EmployeeAttitudes*100)/total)
    }

    return Math.ceil((FullInfomation*100)/total)
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////
}
