import { Component, ViewChild } from '@angular/core';
import { MatDatepicker } from '@angular/material/datepicker';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
  
})
export class HomepageComponent {
  selectedCustomer:string = "1 Customer"
  customer:string = "2 Customers";
  busTypeSelected:string = "Double Room";
  busType:string = "Limousine Single Room";
  DLocation:any
  ALocation:any
  cities  = [
    { value: 'pizza-0', viewValue: 'Pizza' },
    { value: 'tacos-1', viewValue: 'Tacos' },
    { value: 'burger-2', viewValue: 'Burger' }
  ]
  constructor() {

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
}
