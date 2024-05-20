import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../services/Data.service';

@Component({
  selector: 'app-sign-up-password',
  templateUrl: './sign-up-password.component.html',
  styleUrls: ['./sign-up-password.component.scss']
})
export class SignUpPasswordComponent {
  password: string = ""; 
  confirmPassword: string = ""
  phoneNumber: string = ""
  userId: string = ""

  constructor(private router: Router, private dataService: DataService) {
    const phoneNumber = localStorage.getItem("phoneNumber") 
    if (phoneNumber != null) {
      this.phoneNumber = phoneNumber      
    }
    const userIdRaw = localStorage.getItem("userId")
    if (userIdRaw != null) {
      const userId = userIdRaw.replace(/"/g,'');
      this.userId = userId
    }
  }

  ngOnInit(): void {
    // Initialization logic if needed
  }

  confirm() {
    if (this.password === "") {
      alert("Please input your password")
      return
    }
    if (this.confirmPassword !== this.password) {
      alert("Password does not match.")
      return
    } else {
      this.dataService.postAccount(this.phoneNumber, this.password, this.userId).subscribe( data => {
        localStorage.setItem('token',this.userId)
        this.router.navigate([{ outlets: { 'auth-popup': [null] } }]);
        window.location.reload()
      })
    }
  }
}
