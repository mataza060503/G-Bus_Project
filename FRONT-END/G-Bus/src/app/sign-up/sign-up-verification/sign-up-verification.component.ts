import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import firebase from 'firebase/compat/app';


@Component({
  selector: 'app-sign-up-verification',
  templateUrl: './sign-up-verification.component.html',
  styleUrls: ['./sign-up-verification.component.scss']
})
export class SignUpVerificationComponent {
  phoneNumber: string;
  verificationCode: string = '';
  recaptchaVerifier!: firebase.auth.RecaptchaVerifier; 

  constructor(private router: Router, private authService: AuthService) {
    this.phoneNumber = ''; 
    const phoneNumber = localStorage.getItem("phoneNumber") 
    if (phoneNumber != null) {
      this.phoneNumber = phoneNumber      
    }
  }

  async verifyCode() {
    try {
      const userCredential = await this.authService.verifyOTP(this.verificationCode);
      console.log('User verified:', userCredential.user?.uid);
      localStorage.setItem("userId",JSON.stringify(userCredential.user?.uid))
      this.router.navigate([{ outlets: { 'auth-popup': ['sign-up-password'] } }]);
    } catch (error) {
      console.error('Error verifying the code:', error);
      alert("Invalid OTP code, please resend!")
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
      this.router.navigate([{ outlets: { 'auth-popup': ['sign-up-verify'] } }]);
    } catch (error) {
      console.error('Failed to send verification code:', error);
    }
  }

  goToSignUpPassword() {
    this.router.navigate([{ outlets: { 'auth-popup': ['sign-up-password'] } }]);
  }

  resend() {
    this.initRecaptcha()
  }
}
