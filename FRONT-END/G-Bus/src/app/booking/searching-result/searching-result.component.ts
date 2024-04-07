import { Component, OnInit } from '@angular/core';
import { empty } from 'rxjs';
import { FeedbackItem, LocalData } from '../../../models/Item';
import { LocalDataService } from '../../../services/LocalData.service';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../../services/Data.service';
import { Bus, RawTicket, Ticket, Route, Amenities } from '../../../models/ticket';

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

  searchResult:{} = {"DLocation":"", "ALocation":"", "DDate": "", "RDate":""}
  /////////////////////////////////////////////////////////////////////////////////////////////

  /** Ticket Variables */
  tickets!: Ticket[]
  rawTicket!: RawTicket[]

  constructor(private localDataService:LocalDataService, private dataService: DataService, private activatedRoute:ActivatedRoute) {
    this.localDataService.getLocalData().subscribe(data => {
      this.localData = data
    })
    this.loadDataIntoSearchBar()
    this.loadTicketData()
    this.tickets = []
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
    this.dataService.getRawTicket(this.DLocation, this.ALocation, this.formatDate(this.DDate)).subscribe({
      next: (data: RawTicket[]) => {
        this.rawTicket = data;
        console.log(this.rawTicket);
  
        // Initialize tickets array
        this.tickets = [];
  
        // Iterate over raw tickets
        for (let i = 0; i < this.rawTicket.length; i++) {
          const ticket = this.rawTicket[i];
  
          // Create a new Ticket object
          const newTicket: Ticket = {
            Ticket: ticket,
            Seat: [],
            Route: {} as Route,
            Reviews: [],
            Amenities: [],
            Bus: {} as Bus
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
  

  //Date Functions
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
    const selected = event.target as HTMLElement
    const icon = selected.querySelector("#ticket-expand-icon") as HTMLElement
    if (this.isDropdownOpen[index]) {
      icon.style.rotate = "180deg"
    } else {
      icon.style.rotate = "0deg"
    }
  }
  toggleSteper(index: number) {
    this.isSteperOpen[index] = !this.isSteperOpen[index]
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
}
