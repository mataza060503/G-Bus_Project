import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewInvoiceCompleteComponent } from './view-invoice-complete/view-invoice-complete.component';



@NgModule({
  declarations: [

    ViewInvoiceCompleteComponent
  ],
  imports: [
    CommonModule
  ], exports: [

    ViewInvoiceCompleteComponent
  ]
})
export class ViewInvoiceModule { }
