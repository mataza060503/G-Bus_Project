import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../services/Data.service';

@Component({
  selector: 'app-login-password',
  templateUrl: './login-password.component.html',
  styleUrl: './login-password.component.scss'
})
export class LoginPasswordComponent {
  password:string = ""

  constructor(private router:Router, private dataService: DataService) {
    
  }

  checkPassword() {
    this.dataService.checkPassword(this.password).subscribe(data=> {
      alert(data)
      localStorage.setItem('token',data)
      window.location.reload()
    })
  }

  resetPassword() {
    this.router.navigate([{ outlets: { 'auth-popup': ['forgot-password-phone-number'] } }]);
  }
}
