import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-forgot-password-2',
  templateUrl: './forgot-password-2.component.html',
  styleUrl: './forgot-password-2.component.scss'
})
export class ForgotPassword2Component {
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
      this.router.navigate([{ outlets: { 'auth-popup': ['forgot-password-password'] } }]);
    } catch (error) {
      console.error('Error verifying the code:', error);
      // Handle verification failure
    }
  }

}
