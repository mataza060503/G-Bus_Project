import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchingResultComponent } from './searching-result/searching-result.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {MatSliderModule} from '@angular/material/slider';

import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    SearchingResultComponent
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
    FormsModule,
    HttpClientModule,
    RouterModule
  ], 
  exports: [
    SearchingResultComponent
  ],providers: [
    provideNativeDateAdapter()
  ]
})
export class BookingModule { }
