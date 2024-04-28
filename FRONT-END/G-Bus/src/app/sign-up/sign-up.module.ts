import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpPasswordComponent } from './sign-up-password/sign-up-password.component';
import { SignUpPhoneNumberComponent } from './sign-up-phone-number/sign-up-phone-number.component';
import { SignUpVerificationComponent } from './sign-up-verification/sign-up-verification.component';



@NgModule({
  declarations: [
    SignUpPasswordComponent,
    SignUpPhoneNumberComponent,
    SignUpVerificationComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SignUpModule { }
