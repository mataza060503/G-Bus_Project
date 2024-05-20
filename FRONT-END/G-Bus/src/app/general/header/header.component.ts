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
  isSigned: boolean = false;
  isPopup: boolean = false;


  constructor(private router: Router) {
    this.router.navigate([{ outlets: { 'auth-popup': null } }]);
    for (let i = 0; i < 4; i++) {
      this.selectedLink.push(false)
    }
    this.selectedLink[0] = true
    const token = localStorage.getItem("token")
    if (token != null && token != "") {
      this.isSigned = true
    }
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
  if (target.textContent === "Homepage") {
    this.router.navigate([""])
  }

 }

 openLoginPopup() {
  this.isPopup = true
  this.router.navigate([{ outlets: { 'auth-popup': ['login-phone-number'] } }]);
 }

 cancelPopup() {
  this.router.navigate([{ outlets: { 'auth-popup': null } }]);
  this.isPopup = false
 }

 goToAccountManagement() {
  this.router.navigate(["account"])
 }

 goToNotification() {
  this.router.navigate(["notification"])
 }

}
