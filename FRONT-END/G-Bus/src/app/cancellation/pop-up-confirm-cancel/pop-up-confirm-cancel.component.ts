import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pop-up-confirm-cancel',
  templateUrl: './pop-up-confirm-cancel.component.html',
  styleUrl: './pop-up-confirm-cancel.component.scss'
})
export class PopUpConfirmCancelComponent {
  constructor(private router: Router) {

  }

  confirm() {}
}
