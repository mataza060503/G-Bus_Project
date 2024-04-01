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
  selectedLink: string = '';
  constructor(private router: Router) {

  }

  ngOnInit(): void {
    
  }

  // Modify the navigation method
  

 headerNavSelected(event:any, headerName:string) {
  const selectedHeader = event.target as HTMLElement
  const headerList = document.getElementsByTagName("li") as HTMLCollection
  console.log(headerList)
  for (let i = 0; i < headerList.length; i++) {
    const header = headerList[i];
    console.log(header.textContent)
    if (header.textContent) {
      
    }
  }
 }

}
