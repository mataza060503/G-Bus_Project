import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { DataService } from '../../../services/Data.service';
import { Observable, map } from 'rxjs';

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

  constructor(private router:Router, private authService: AuthService, private dataService: DataService) {
    
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
    const phoneNumberRegex = /^\+?0\d{9}$/;  
  
    if (this.phoneNumber && phoneNumberRegex.test(this.phoneNumber)) {
      this.checkExistAccount(this.phoneNumber).subscribe(isExist => {
        if (isExist) {
          localStorage.setItem("phoneNumber", this.phoneNumber)
          this.router.navigate([{ outlets: { 'auth-popup': ['login-password'] } }]);
        } else {
          alert('Phone number not found');
        }
      });
    } else {
      alert("Your phone number is invalid!");
    }
  }

  loginWithGoogle() {
    this.authService.loginWithGoogle()
  }

  cancelPopup() {
    this.router.navigate([{ outlets: { 'auth-popup': null } }]);
  }

  signUp() {
    this.router.navigate([{ outlets: { 'auth-popup': ['sign-up-phone-number'] } }]);
  }

  checkExistAccount(phoneNumber: string): Observable<boolean> {
    return this.dataService.checkExistAccount(phoneNumber).pipe(
      map(data => {
        console.log(data);
        return data === "true";
      })
    );
  }
}
