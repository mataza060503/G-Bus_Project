import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-sign-up-verification',
  templateUrl: './sign-up-verification.component.html',
  styleUrls: ['./sign-up-verification.component.scss']
})
export class SignUpVerificationComponent {
  phoneNumber: string;
  verificationCode: string = '';

  constructor(private router: Router, private authService: AuthService) {
    this.phoneNumber = ''; // Initialize phoneNumber if needed
  }

  async verifyCode() {
    try {
      const userCredential = await this.authService.verifyOTP(this.verificationCode);
      console.log('User verified:', userCredential.user?.uid);
      localStorage.setItem("userId",JSON.stringify(userCredential.user?.uid))
      this.router.navigate([{ outlets: { 'auth-popup': ['sign-up-password'] } }]);
    } catch (error) {
      console.error('Error verifying the code:', error);
      // Handle verification failure
    }
  }

  goToSignUpPassword() {
    this.router.navigate([{ outlets: { 'auth-popup': ['sign-up-password'] } }]);
  }
}
