import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-phone-number',
  templateUrl: './phone-number.component.html',
  styleUrl: './phone-number.component.scss'
})
export class PhoneNumberComponent implements OnInit{
  portImage:string = "./assets/images/login/vn.png 2x"
  portText:string = "+85"
  portImageSelected:string = ""
  portTextSelected:string = ""
  phoneNumber:string = ""

  constructor(private router:Router, private authService: AuthService) {
    
  }

  ngOnInit(): void {
    const loginPhoneNumberPopup = document.querySelector("#loginPhoneNumber") as HTMLElement
    console.log(loginPhoneNumberPopup)

    this.phoneNumber = localStorage.getItem("phoneNumber") || ""
    this.portImageSelected = "./assets/images/login/vn.png 2x"
    this.portTextSelected = "+84"
    
  }

  select() {
    this.portImageSelected=this.portImage
    this.portTextSelected=this.portText
  }

  next() {
    const phoneNumberRegex = /^\+?0\d{9}$/; // Updated regex to allow optional '+' before '0'
    if (this.phoneNumber && phoneNumberRegex.test(this.phoneNumber)) {
      this.router.navigate(["/login-password"])
    } else {
      alert("Your phone number is invalid!");
      localStorage.setItem("phoneNumber",this.phoneNumber)
      localStorage.setItem("token","true")
    }
  }

  loginWithGoogle() {
    this.authService.loginWithGoogle()
  }
}
