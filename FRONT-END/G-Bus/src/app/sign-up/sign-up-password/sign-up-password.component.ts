import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up-password',
  templateUrl: './sign-up-password.component.html',
  styleUrls: ['./sign-up-password.component.scss']
})
export class SignUpPasswordComponent {
  password: string = ""; // Declare the password property with an initial value

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Initialization logic if needed
  }

  // Other methods if needed
}
