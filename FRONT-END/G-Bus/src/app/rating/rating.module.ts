import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Rating1Component } from './rating1/rating1.component';
import { Rating2Component } from './rating2/rating2.component';
import { Rating3Component } from './rating3/rating3.component';
import { Rating4Component } from './rating4/rating4.component';
import { Rating5Component } from './rating5/rating5.component';



@NgModule({
  declarations: [
    Rating1Component,
    Rating2Component,
    Rating3Component,
    Rating4Component,
    Rating5Component
  ],
  imports: [
    CommonModule
  ]
})
export class RatingModule { }
