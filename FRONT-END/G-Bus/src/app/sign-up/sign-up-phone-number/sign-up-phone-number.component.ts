import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up-phone-number',
  templateUrl: './sign-up-phone-number.component.html',
  styleUrls: ['./sign-up-phone-number.component.scss']
})
export class SignUpPhoneNumberComponent implements OnInit{
  portImage:string = "./assets/images/login/vn.png 2x"
  portText:string = "+84"
  portImageSelected:string = ""
  portTextSelected:string = ""
  phoneNumber:string = ""

  constructor(private router:Router) {}

  ngOnInit(): void {
    const SignUpPhoneNumberPopup = document.querySelector("#signupPhoneNumber") as HTMLElement
    console.log(SignUpPhoneNumberPopup)

    this.phoneNumber = localStorage.getItem("phoneNumber") || ""
    this.portImageSelected = "./assets/images/login/vn.png 2x"
    this.portTextSelected = "+84"
  }

  select() {
    this.portImageSelected=this.portImage
    this.portTextSelected=this.portText
  }

  next() {
    const phoneNumberRegex = /^\+?0\d{9}$/; 
    if (this.phoneNumber && phoneNumberRegex.test(this.phoneNumber)) {
      this.router.navigate(["/sign-up-password"])
    } else {
      alert("Your phone number is invalid!");
      localStorage.setItem("phoneNumber",this.phoneNumber)
      localStorage.setItem("token","true")
    }
  }

  signupWithGoogle() {

  }

}
