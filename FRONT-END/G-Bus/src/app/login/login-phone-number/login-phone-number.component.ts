import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-phone-number',
  templateUrl: './login-phone-number.component.html',
  styleUrl: './login-phone-number.component.scss'
})
export class LoginPhoneNumberComponent implements OnInit{
  portImage:string = "./assets/images/login/vn.png 2x"
  portText:string = "+85"
  portImageSelected:string = ""
  portTextSelected:string = ""
  phoneNumber:string = ""

  constructor(private router:Router) {
    
  }

  ngOnInit(): void {
    const loginPhoneNumberPopup = document.querySelector("#loginPhoneNumber") as HTMLElement
    console.log(loginPhoneNumberPopup)
    loginPhoneNumberPopup.style.display = "block"

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

  }

}
