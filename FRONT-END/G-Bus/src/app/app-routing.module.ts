import { SearchingResultComponent } from './booking/searching-result/searching-result.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPasswordComponent } from './login/login-password/login-password.component';
import { LoginPhoneNumberComponent } from './login/login-phone-number/login-phone-number.component';
import { HomepageComponent } from './general/homepage/homepage.component';
import { PassengerInfoComponent } from './booking/passenger-info/passenger-info.component';

const routes: Routes = [
  {path:'passengerInfo',component:HomepageComponent},
  {path:'searchResult/:DLocation/:ALocation/:DDate/:RDate',component:SearchingResultComponent},
  {path:'', component:PassengerInfoComponent},
  {path:'login-phoneNumber',
  component:LoginPhoneNumberComponent,outlet:"auth-popup"},
  {path:'login-password',
  component:LoginPasswordComponent,outlet:"auth-poppopup"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
