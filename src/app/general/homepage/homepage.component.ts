import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { LocalDataService } from '../../../services/LocalData.service';
import { LocalData } from '../../../models/Item';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
  
})
export class HomepageComponent implements OnInit{
  selectedCustomer:string = "1 Customer"
  customer:string = "2 Customers";
  busTypeSelected:string = "Double Room";
  busType:string = "Limousine Single Room";
  DLocation:any
  ALocation:any
  localData: LocalData = { contryPort: [], provinces: [] };
  constructor(private localDataService: LocalDataService) {

  }

  ngOnInit(): void {
    this.localDataService.getLocalData().subscribe(data => {
      this.localData = data
    })
    console.log(this.localData.provinces)
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
