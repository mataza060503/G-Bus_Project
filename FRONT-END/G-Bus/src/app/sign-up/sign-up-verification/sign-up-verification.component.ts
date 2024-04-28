import { Component } from '@angular/core';

@Component({
  selector: 'app-sign-up-verification',
  templateUrl: './sign-up-verification.component.html',
  styleUrls: ['./sign-up-verification.component.scss']
})
export class SignUpVerificationComponent {
  phoneNumber: string;

  constructor() {
    this.phoneNumber = ''; // Initialize phoneNumber if needed
  }

  verify(): void {
    // Add logic to verify the entered code
    console.log('Verification logic goes here');
  }
}
