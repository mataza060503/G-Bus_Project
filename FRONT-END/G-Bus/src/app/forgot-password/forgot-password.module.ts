import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotPassword1Component } from './forgot-password-1/forgot-password-1.component';
import { ForgotPassword2Component } from './forgot-password-2/forgot-password-2.component';
import { ForgotPassword3Component } from './forgot-password-3/forgot-password-3.component';



@NgModule({
  declarations: [
    ForgotPassword1Component,
    ForgotPassword2Component,
    ForgotPassword3Component
  ],
  imports: [
    CommonModule
  ]
})
export class ForgotPasswordModule { }
