import { Component, OnInit } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { LoginPasswordComponent } from '../../login/login-password/login-password.component';
import { LoginPhoneNumberComponent } from '../../login/login-phone-number/login-phone-number.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class HeaderComponent implements OnInit{
  selectedLink: boolean[] = [];
  constructor(private router: Router) {
    for (let i = 0; i < 4; i++) {
      this.selectedLink.push(false)
    }
    this.selectedLink[0] = true

  }
  

  ngOnInit(): void {
    
  }

  // Modify the navigation method
  

 headerNavSelected(event:any,index:number) {
  const target = event.target as HTMLElement
  for (let i = 0; i < this.selectedLink.length; i++) {
    this.selectedLink[i] = false
  }
  this.selectedLink[index] = true
  if (target.textContent === "Schedule") {
    this.router.navigate(["searchResult","","","",""])
  }

 }

}
