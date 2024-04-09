import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { LocalDataService } from '../../../services/LocalData.service';
import { FeedbackItem, LocalData, PartnerPromotion, PromotionItem, RouteItem, SearchItem, SlideItem } from '../../../models/Item';
import { ThemePalette } from '@angular/material/core';
import { DataService } from '../../../services/Data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
  
})
export class HomepageComponent implements OnInit{
  errMessage: string = ""

  selectedCustomer:string = "1 Customer"
  customer:string = "2 Customers";
  busTypeSelected:string = "Double Room";
  busType:string = "Limousine Single Room";

  DLocation:any
  ALocation:any
  DDate:any
  RDate:any
  localData: LocalData = { contryPort: [], provinces: [] };

  SearchingHistory!: SearchItem[]
  slideCurrentPercent: number
  slidePercent: number = 0 

  routes!: RouteItem[]
  routeSlideCurrentPercent:number
  routeSlidePercent:number = 0

  promotions!: PromotionItem[]
  promotionSlideCurrentPercent: number
  promotionSlidePercent:number = 0

  pnPromotions!: PartnerPromotion[]
  pnPromotionnSlideCurrentPercent: number = 3
  pnPromotionSlidePercent: number = 0

  feedbacks!: FeedbackItem[]
  feedbackSlide: SlideItem[] = []
  feedbackSlideCurrentPercent: number = 3
  feedbackSlidePercent: number = 0

  minDate: Date;
  maxDate: Date

  ngOnInit(): void {
    this.localDataService.getLocalData().subscribe(data => {
      this.localData = data
    })
    
    this.getRouteData()
    this.getPromotionData()
    this.getPartnerPromotion()
    this.getFeedback()

    const localStorageData = localStorage.getItem("his");
    if (localStorageData) {
      const parsedData = JSON.parse(localStorageData);
      this.SearchingHistory = parsedData.slice(0, 20);
    } else {
      this.SearchingHistory = [];
}
    this.slidePercent=(3/this.SearchingHistory.length)*100
        
  }

  constructor(private localDataService: LocalDataService, private dbService: DataService, private router: Router) {
    this.slideCurrentPercent = 3
    this.routeSlideCurrentPercent = 4
    this.promotionSlideCurrentPercent = 3

    const currentDate = new Date();
    this.minDate = currentDate
    this.maxDate = new Date(currentDate.getTime() + 30 * 24 * 60 * 60 * 1000)
  }

  //Couseral 
  slides = [
    {img: "http://placehold.it/350x150/000000"},
    {img: "http://placehold.it/350x150/111111"},
    {img: "http://placehold.it/350x150/333333"},
    {img: "http://placehold.it/350x150/666666"}
  ];

  slideConfig = {
    "slidesToShow": 3, 
    "slidesToScroll": 1, 
    "autoplay":false,
    "infinite": false
  };
  commonRouteSlideConfig = {
    "slidesToShow": 4, 
    "slidesToScroll": 1, 
    "autoplay":false,
    "infinite": false
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
  // End of couseral config

  //Format Date
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

  calculateDaysLeft(targetDate:string) {
    // Get the current date
    const currentDate = new Date();
    // Parse the target date
    const [day, month, year] = targetDate.split('-');
    const target = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    
    // Calculate the difference in milliseconds
    const differenceMs = target.getTime() - currentDate.getTime();
    // Convert milliseconds to days
    const daysLeft = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));
    var result = ""

    if (daysLeft == 1) {
      result = "1 day left"
    } else {
      result = daysLeft + " days left"
    }

    return result
  } 

  //Other functions:
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
    var searchResult = {"DLocation":this.DLocation, "ALocation":this.ALocation, "DDate": this.DDate || ""}
    if (searchResult.DLocation !== undefined && searchResult.ALocation !== undefined && searchResult.DDate !== undefined) {
      var searchHis = []
      searchHis = JSON.parse(localStorage.getItem("his") || "[]")
      searchHis.unshift(searchResult)
      localStorage.setItem("his",JSON.stringify(searchHis))

      this.SearchingHistory = JSON.parse(localStorage.getItem("his") || "[]")

      if (this.RDate !== undefined) {
        this.router.navigate(["searchResult",this.DLocation,this.ALocation,this.formatDate(this.DDate),this.formatDate(this.RDate)])
      } else if (this.RDate === undefined) {
        this.router.navigate(["searchResult",this.DLocation,this.ALocation,this.formatDate(this.DDate),""])
      }
      
    } else {
      alert("Please select your trip information")
    }
  }

  //Carousel slide control function

  //Current search
  nextProgress() {
    if (this.slideCurrentPercent < this.SearchingHistory.length) {
      this.slideCurrentPercent ++
    }
    this.slidePercent = ((this.slideCurrentPercent)/this.SearchingHistory.length)*100
    
  }
  prevProgress() {
    if (this.slideCurrentPercent > 3) {
      this.slideCurrentPercent --
    }
    this.slidePercent = ((this.slideCurrentPercent)/this.SearchingHistory.length)*100
    
  }

  //Common Routes
  routeNextProgress() {
    if (this.routeSlideCurrentPercent < this.routes.length) {
      this.routeSlideCurrentPercent ++
    }
    this.routeSlidePercent = ((this.routeSlideCurrentPercent)/this.routes.length)*100
    
  }
  routePrevProgress() {
    if (this.routeSlideCurrentPercent > 3) {
      this.routeSlideCurrentPercent --
    }
    this.routeSlidePercent = ((this.routeSlideCurrentPercent)/this.routes.length)*100
    
  }

  //Promotions
  promotionNextProgress() {
    if (this.promotionSlideCurrentPercent < this.promotions.length) {
      this.promotionSlideCurrentPercent ++
    }
    this.promotionSlidePercent = ((this.promotionSlideCurrentPercent)/this.promotions.length)*100
    
  }
  promotionPrevProgress() {
    if (this.promotionSlideCurrentPercent > 3) {
      this.promotionSlideCurrentPercent --
    }
    this.promotionSlidePercent = ((this.promotionSlideCurrentPercent)/this.promotions.length)*100
    
  }

  //Partner Promotions
  pnPromotionNextProgress() {
    if (this.pnPromotionnSlideCurrentPercent < this.pnPromotions.length) {
      this.pnPromotionnSlideCurrentPercent ++
    }
    this.pnPromotionSlidePercent = ((this.pnPromotionnSlideCurrentPercent)/this.pnPromotions.length)*100
    
  }
  pnPromotionPrevProgress() {
    if (this.pnPromotionnSlideCurrentPercent > 3) {
      this.pnPromotionnSlideCurrentPercent --
    }
    this.pnPromotionSlidePercent = ((this.pnPromotionnSlideCurrentPercent)/this.pnPromotions.length)*100
    
  }

  //Feedback Image 
  feedbackNextProgress(slideItem: SlideItem) {
    if (slideItem.CurrentPercent < slideItem.Item.Image.length) {
      slideItem.CurrentPercent ++
    }
    slideItem.Percent = ((slideItem.CurrentPercent)/slideItem.Item.Image.length)*100
  }
  feedbackPrevProgress(slideItem: SlideItem) {
    if (slideItem.CurrentPercent > 3) {
      slideItem.CurrentPercent --
    }
    slideItem.Percent = ((slideItem.CurrentPercent)/slideItem.Item.Image.length)*100
    console.log(slideItem.CurrentPercent)
  }

  //** Working with databse **\\

  //Get Data from Database
  getRouteData() {
    this.dbService.getAllRoute().subscribe({
      next: (data) => {
        this.routes=data,
        this.routeSlidePercent = (4/this.routes.length)*100
      }, error: (err) => {
        this.errMessage = err
      }
    })
  }
  getPromotionData() {
    this.dbService.getAllPromotion().subscribe({
      next: (data) => {
        this.promotions = data
        this.promotionSlidePercent = (3/this.promotions.length)*100
      }, error: (err) => {
        this.errMessage = err 
      }
    })
  }
  getPartnerPromotion() {
    this.dbService.getAllPartnerPromotion().subscribe({
      next: (data) => {
        this.pnPromotions = data
        this.pnPromotionSlidePercent = (3/this.pnPromotions.length)*100
      },
      error: (err) => {
        this.errMessage = err
      }
    })
  }
  getFeedback() {
    this.dbService.getAllFeedback().subscribe({
      next: (data) => {
        this.feedbacks = data
        this.feedbackSlidePercent = (3/this.feedbacks[0].Image.length)*100
        for (let i = 0; i < data.length; i++) {
          const element = data[i];
          var item = {Item:element, CurrentPercent: 3, Percent: (3/element.Image.length)*100}
          this.feedbackSlide.push(item)
        }
        console.log(this.feedbackSlide)
      }, error: (err) => {
        this.errMessage = err
      }
    })
  }

}
