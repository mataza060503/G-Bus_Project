import { Component } from '@angular/core';

@Component({
  selector: 'app-forgot-password-2',
  templateUrl: './forgot-password-2.component.html',
  styleUrl: './forgot-password-2.component.scss'
})
export class ForgotPassword2Component {
  verify(){
    const verify = /^\+?0\d{9}$/
  }
}
