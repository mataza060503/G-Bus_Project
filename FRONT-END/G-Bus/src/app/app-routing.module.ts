import { SearchingResultComponent } from './booking/searching-result/searching-result.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPasswordComponent } from './login/login-password/login-password.component';
import { LoginPhoneNumberComponent } from './login/login-phone-number/login-phone-number.component';
import { HomepageComponent } from './general/homepage/homepage.component';
import { PassengerInfoComponent } from './booking/passenger-info/passenger-info.component';
import { ChoosePaymentMethodComponent } from './choose-payment-method/choose-payment-method.component';
import { SuccesfulPaymentComponent } from './succesful-payment/succesful-payment.component';
import { SignUpPhoneNumberComponent } from './sign-up/sign-up-phone-number/sign-up-phone-number.component';
import { SignUpVerificationComponent } from './sign-up/sign-up-verification/sign-up-verification.component';
import { SignUpPasswordComponent } from './sign-up/sign-up-password/sign-up-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password-1/forgot-password-1.component';
import { ForgotPassword2Component } from './forgot-password/forgot-password-2/forgot-password-2.component';
import { ForgotPassword3Component } from './forgot-password/forgot-password-3/forgot-password-3.component';

const routes: Routes = [
  {path:'',component:HomepageComponent},
  {path:'searchResult/:DLocation/:ALocation/:DDate/:RDate',component:SearchingResultComponent},
  {path:'passengerInfo', component:PassengerInfoComponent},
  {path:'payment',component:ChoosePaymentMethodComponent},
  {path:'postPayment',component:SuccesfulPaymentComponent},
  {path:'login-phone-number',
  component:LoginPhoneNumberComponent,outlet:"auth-popup"},
  {path:'login-password',
  component:LoginPasswordComponent,outlet:"auth-popup"},
  {path:'sign-up-phone-number',component:SignUpPhoneNumberComponent, outlet:'auth-popup'},
  {path:'sign-up-verify', component:SignUpVerificationComponent, outlet:'auth-popup'},
  {path:'sign-up-password', component: SignUpPasswordComponent, outlet:'auth-popup'},
  {path:'forgot-password-phone-number', component:ForgotPasswordComponent, outlet:'auth-popup'},
  {path:'forgot-password-verify', component:ForgotPassword2Component, outlet:'auth-popup'},
  {path:'forgot-password-password', component:ForgotPassword3Component, outlet:'auth-popup'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
