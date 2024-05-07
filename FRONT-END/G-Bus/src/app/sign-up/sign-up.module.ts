import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpPasswordComponent } from './sign-up-password/sign-up-password.component';
import { SignUpPhoneNumberComponent } from './sign-up-phone-number/sign-up-phone-number.component';
import { SignUpVerificationComponent } from './sign-up-verification/sign-up-verification.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SignUpPasswordComponent,
    SignUpPhoneNumberComponent,
    SignUpVerificationComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ], exports: [
    SignUpPasswordComponent,
    SignUpPhoneNumberComponent,
    SignUpVerificationComponent
  ]
})
export class SignUpModule { }
