import { Component, ElementRef, ViewChild } from '@angular/core';
import { DataService } from '../../services/Data.service';
import { Router } from '@angular/router';
import { PassengerInfo, UserInfo } from '../../models/ticket';

@Component({
  selector: 'app-account-management1',
  templateUrl: './account-management1.component.html',
  styleUrl: './account-management1.component.scss'
})
export class AccountManagement1Component {
  accountAvt: string = ""
  accountName: string = ""
  accountEmail: string = ""
  accountPhone: string = ""
  isUserInfo: boolean = false
  isHover: boolean = false
  userInfo: UserInfo = {} as UserInfo 

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  constructor(
    private dataService: DataService,
    private router: Router
  ) {
    this.initializeUserInfo()
    this.loadData()
  }

  openFilePicker(): void {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event): void {
    const element = event.target as HTMLInputElement;
    const file = element.files && element.files[0] ? element.files[0] : null;
    if (file) {
      this.convertFileToBase64(file);
    } else {
      console.error("No file selected");
    }
  }

  private convertFileToBase64(file: File): void {
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (e.target != null) {
        this.userInfo.Image = e.target.result as string;
      }
    };
    reader.readAsDataURL(file);
  }

  loadData() {
    const userId = localStorage.getItem("token")
    if (userId != null) {
      const userIdStr = userId.replace(/"/g, '')
      this.dataService.getAccountInfo(userIdStr).subscribe({
        next: (data) => {
          console.log(data)
          if (data != null) {
            this.userInfo = data
          }
        }, error: (err) => {
          console.log("Load data failed: " + err)
        }
      })
    }
  }

  saveData() {
    // if (
    //   this.accountAvt === "./assets/images/Gbus-logo-avt.png" &&
    //   this.accountEmail === "" &&
    //   this.accountName === "" &&
    //   this.accountPhone === ""
    // ) {
      
    // }

    const userInfo = {
      Image: this.accountAvt,
      FullName: this.userInfo.FullName,
      Email: this.userInfo.Email,
      PhoneNumber: this.userInfo.PhoneNumber
    } 

    const userId = localStorage.getItem("token")

    if (userId != null) {
      const userIdStr = userId.replace(/"/g, '');
      this.dataService.postAccountInfo(userIdStr, userInfo).subscribe(data => {
        console.log(data)
      })
    }
  }

  bookingHistory() {
    this.router.navigate(['booking-history'])
  }

  initializeUserInfo() {
    this.userInfo.Email = ""
    this.userInfo.Image = "./assets/images/Gbus-logo-avt.png"
    this.userInfo.FullName = ""
    this.userInfo.PhoneNumber = ""
  }
}
