import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewInvoiceUpcomingComponent } from './view-invoice-upcoming/view-invoice-upcoming.component';
import { ViewInvoiceOnGoingComponent } from './view-invoice-on-going/view-invoice-on-going.component';
import { ViewInvoiceCompleteComponent } from './view-invoice-complete/view-invoice-complete.component';



@NgModule({
  declarations: [
    ViewInvoiceUpcomingComponent,
    ViewInvoiceOnGoingComponent,
    ViewInvoiceCompleteComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ViewInvoiceModule { }
