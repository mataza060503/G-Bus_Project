import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pop-up-cancel-complete',
  templateUrl: './pop-up-cancel-complete.component.html',
  styleUrl: './pop-up-cancel-complete.component.scss'
})
export class PopUpCancelCompleteComponent {
  constructor(private router: Router) {
    this.router.navigate([{ outlets: { 'auth-popup': null } }]);
  }
}
