import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../services/Data.service';

@Component({
  selector: 'app-forgot-password-3',
  templateUrl: './forgot-password-3.component.html',
  styleUrl: './forgot-password-3.component.scss'
})
export class ForgotPassword3Component {
  password: string = ""; 
  confirmPassword: string = ""
  phoneNumber: string = ""
  userId: string = ""

  constructor(private router: Router, private dataService: DataService) {
    const phoneNumber = localStorage.getItem("phoneNumber") 
    if (phoneNumber != null) {
      this.phoneNumber = phoneNumber      
    }
    const userId = localStorage.getItem("userId")
    if (userId != null) {
      this.userId = userId
    }
  }

  ngOnInit(): void {
    // Initialization logic if needed
  }

  confirm() {
    if (this.password.length < 8) {
      alert("Password at least 8 characters")
      return
    }
    if (this.confirmPassword !== this.password) {
      alert("Password does not match.")
      return
    } else {
      this.dataService.patchPassword(this.phoneNumber, this.password).subscribe( data => {
        localStorage.setItem('token',data)
        this.router.navigate([{ outlets: { 'auth-popup': [null] } }]);
        this.router.navigate([''])
      })
    }
  }
}
