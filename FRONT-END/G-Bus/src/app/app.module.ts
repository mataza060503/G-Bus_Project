import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat'
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { Component, inject, TemplateRef, ViewEncapsulation } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';

import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'; 
import { MatButtonModule } from '@angular/material/button'; 
import { MatCheckboxModule } from '@angular/material/checkbox';
import { QRCodeModule } from 'angularx-qrcode';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';
import { SignUpModule } from './sign-up/sign-up.module';
import { GeneralModule } from './general/general.module';
import { BookingModule } from './booking/booking.module';
import { BookingHistoryModule } from './booking-history/booking-history.module';
import { SignInModule } from './sign-in/sign-in.module';
import { ForgotPasswordModule } from './forgot-password/forgot-password.module';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { environment } from '../environments/environment';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AccountManagement1Component } from './account-management1/account-management1.component';
import { Cancellation2Component } from './cancellation2/cancellation2.component';
import { ChoosePaymentMethodComponent } from './choose-payment-method/choose-payment-method.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { Notification2Component } from './notification2/notification2.component';
import { PopupComponent } from './popup/popup.component';
import { SuccesfulPaymentComponent } from './succesful-payment/succesful-payment.component';
import { UnsuccessfulPaymentComponent } from './unsuccessful-payment/unsuccessful-payment.component';
import { PaymentEWalletComponent } from './payment-ewallet/payment-ewallet.component';



@NgModule({
  declarations: [
    AppComponent,
    AccountManagement1Component,
    Cancellation2Component,
    ChoosePaymentMethodComponent,
    NotificationsComponent,
    Notification2Component,
    PopupComponent,
    SuccesfulPaymentComponent,
    UnsuccessfulPaymentComponent,
    PaymentEWalletComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    QRCodeModule,
    
    MatFormFieldModule,
    MatInputModule, 
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    SlickCarouselModule,
    NgbModule,

    AngularFireModule.initializeApp(environment.firebase),

    LoginModule,
    SignUpModule,
    GeneralModule,
    BookingModule,
    BookingHistoryModule,
    SignUpModule,
    ForgotPasswordModule
  ],
  providers: [
    provideNativeDateAdapter(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
