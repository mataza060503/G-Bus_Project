import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchingResultComponent } from './searching-result/searching-result.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {MatSliderModule} from '@angular/material/slider';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { SlickCarouselModule } from 'ngx-slick-carousel';

import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { PassengerInfoComponent } from './passenger-info/passenger-info.component';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { MessageService } from 'primeng/api';
import { ProgressSpinnerModule } from 'primeng/progressspinner';





@NgModule({
  declarations: [
    SearchingResultComponent,
    PassengerInfoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    MatSliderModule,
    MatFormFieldModule, 
    MatDatepickerModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatProgressBarModule,
    SlickCarouselModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    ToastModule,
    ProgressSpinnerModule,
  ], 
  exports: [
    SearchingResultComponent
  ],providers: [
    provideNativeDateAdapter(),
    MessageService
  ]
})
export class BookingModule { }
