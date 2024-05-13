import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordComponent } from './password/password.component';
import { PhoneNumberComponent } from './phone-number/phone-number.component';
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    PasswordComponent,
    PhoneNumberComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    PhoneNumberComponent,
    PasswordComponent
  ]
})
export class SignInModule { }
