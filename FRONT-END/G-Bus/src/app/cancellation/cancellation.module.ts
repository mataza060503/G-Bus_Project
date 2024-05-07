import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChooseCancelReasonComponent } from './choose-cancel-reason/choose-cancel-reason.component';
import { CancellationDetailsComponent } from './cancellation-details/cancellation-details.component';
import { PopUpConfirmCancelComponent } from './pop-up-confirm-cancel/pop-up-confirm-cancel.component';
import { PopUpCancelCompleteComponent } from './pop-up-cancel-complete/pop-up-cancel-complete.component';



@NgModule({
  declarations: [
    ChooseCancelReasonComponent,
    CancellationDetailsComponent,
    PopUpConfirmCancelComponent,
    PopUpCancelCompleteComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CancellationModule { }
