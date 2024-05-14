import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../services/Data.service';
import { AuthService } from '../../../services/auth.service';
import firebase from 'firebase/compat/app';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password-1.component.html',
  styleUrl: './forgot-password-1.component.scss'
})
export class ForgotPasswordComponent implements OnInit {
  portImage:string = "./assets/images/login/vn.png 2x"
  portText:string = "+85"
  portImageSelected:string = ""
  portTextSelected:string = ""
  phoneNumber:string = ""
  verificationCode: string = "";
  confirmationResult?: firebase.auth.ConfirmationResult;
  recaptchaVerifier!: firebase.auth.RecaptchaVerifier; 

  constructor(private router:Router, private dataService: DataService, private authService: AuthService) {

}

  ngOnInit(): void {
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
          this.initRecaptcha();
        } else {
          alert('Phone number not found');
        }
      });
    } else {
      alert("Your phone number is invalid!");
    }
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
      this.router.navigate([{ outlets: { 'auth-popup': ['forgot-password-verify'] } }]);
    } catch (error) {
      console.error('Failed to send verification code:', error);
    }
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

