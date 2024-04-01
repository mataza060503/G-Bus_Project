import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomepageComponent } from './homepage/homepage.component';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import { LocalDataService } from '../../services/LocalData.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import {MatProgressBarModule} from '@angular/material/progress-bar';

import 'slick-carousel/slick/slick.min.js';




@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    HomepageComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule, 
    MatDatepickerModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    SlickCarouselModule,
    MatProgressBarModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    HomepageComponent
  ],
  providers: [
    provideNativeDateAdapter()
  ]
})
export class GeneralModule { }
