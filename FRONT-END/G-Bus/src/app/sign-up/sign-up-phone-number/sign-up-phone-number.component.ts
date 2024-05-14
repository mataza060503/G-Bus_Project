import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import firebase from 'firebase/compat/app';
import { DataService } from '../../../services/Data.service';
import { Observable, map } from 'rxjs';

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
  verificationCode: string = "";
  confirmationResult?: firebase.auth.ConfirmationResult;
  recaptchaVerifier!: firebase.auth.RecaptchaVerifier; 


  constructor(private router:Router, private authService: AuthService, private dataService: DataService) {}

  ngOnInit(): void {
    const SignUpPhoneNumberPopup = document.querySelector("#signupPhoneNumber") as HTMLElement
    console.log(SignUpPhoneNumberPopup)

    this.portImageSelected = "./assets/images/login/vn.png 2x"
    this.portTextSelected = "+84"
  }

  initRecaptcha() {
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      'size': 'normal',
      'callback': () => {
        console.log('reCAPTCHA solved, automatically sending verification code');
        this.sendVerificationCode();  // Call your function directly here
      } 
    });
    this.recaptchaVerifier.render();
  }

  async sendVerificationCode() {
    try {
      const internationalNumber = `+84${this.phoneNumber.substring(1)}`; 
      await this.authService.signUpWithPhoneNumber(internationalNumber, this.recaptchaVerifier);
      localStorage.setItem("phoneNumber", this.phoneNumber)
      this.router.navigate([{ outlets: { 'auth-popup': ['sign-up-verify'] } }]);
    } catch (error) {
      console.error('Failed to send verification code:', error);
    }
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
          alert("This phone number has already registed")
        } else {
          this.initRecaptcha()
        }
      });
    } else {
      alert("Your phone number is invalid!");
    }
  }

  signInWithGoogle() {
    this.authService.loginWithGoogle()
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
