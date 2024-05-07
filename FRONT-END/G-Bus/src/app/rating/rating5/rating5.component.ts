import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rating5',
  templateUrl: './rating5.component.html',
  styleUrl: './rating5.component.scss'
})
export class Rating5Component implements OnInit{
  portImage:string = "./assets/images/rating5.png"
  portImageSelected:string = ""


  constructor(private router:Router) {
}

ngOnInit(): void {
 
  this.portImageSelected = "./assets/images/rating5.png"
  
}
}
