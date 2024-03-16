import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPhoneNumberComponent } from './login-phone-number/login-phone-number.component';
import { LoginPasswordComponent } from './login-password/login-password.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LoginPhoneNumberComponent,
    LoginPasswordComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ], 
  exports: [
    LoginPhoneNumberComponent,
    LoginPasswordComponent
  ]
})
export class LoginModule { }
