import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rating4',
  templateUrl: './rating4.component.html',
  styleUrl: './rating4.component.scss'
})
export class Rating4Component implements OnInit{
  portImageSelected:string = ""
  portImageSelected1:string = ""
  portImageSelected2:string = ""
  portImageSelected3:string = ""
  portImageSelected4:string = ""
  portImageSelected5:string = ""
  portImageSelected6:string = ""
  portImageSelected7:string = ""
  portImageSelected8:string = ""
  portImageSelected9:string = ""




  constructor(private router:Router) {
}

ngOnInit(): void {
 
  this.portImageSelected = "./assets/images/rating3/person.png"
  this.portImageSelected1 = "./assets/images/rating3/PaymentInformation.png"
  this.portImageSelected2 ="./assets/images/rating3/BookingHistory.png"
  this.portImageSelected3 ="./assets/images/rating3/Promotions.png"
  this.portImageSelected4 ="./assets/images/rating3/TripRatings.png"
  this.portImageSelected5 ="./assets/images/rating3/Promotional.png"
  this.portImageSelected6 ="./assets/images/rating3/Feedback.png"
  this.portImageSelected7 ="./assets/images/rating3/Language.png"
  this.portImageSelected8 ="./assets/images/rating3/Help.png"
  this.portImageSelected9 ="./assets/images/rating3/photo.png"

  
}

}