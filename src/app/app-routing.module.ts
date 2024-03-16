import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPasswordComponent } from './login/login-password/login-password.component';
import { LoginPhoneNumberComponent } from './login/login-phone-number/login-phone-number.component';

const routes: Routes = [
  {path:'',
  component:LoginPhoneNumberComponent},
  {path:'login-password',
  component:LoginPasswordComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
