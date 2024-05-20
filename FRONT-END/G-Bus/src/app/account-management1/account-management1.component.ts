import { Component, ElementRef, ViewChild } from '@angular/core';
import { DataService } from '../../services/Data.service';
import { Router } from '@angular/router';
import { PassengerInfo, UserInfo } from '../../models/ticket';
import { MessageService } from 'primeng/api';


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

  toastMsg: string = ""
  errStyle: any = "border: solid 1px #DD1F13;"

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  constructor(
    private dataService: DataService,
    private router: Router,
    private messageService: MessageService
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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^0\d{9}$/;
    if (
      this.userInfo.Image === "./assets/images/Gbus-logo-avt.png" &&
      this.userInfo.FullName === "" &&
      this.userInfo.Email === "" &&
      this.userInfo.PhoneNumber === ""
    ) {
      return;  
    }

    if (!emailRegex.test(this.userInfo.Email)) {
      this.toastMsg = "Invalid email format!"
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid email format!', key:"error"});
      return;  
    }

    if (!phoneRegex.test(this.userInfo.PhoneNumber)) {
      this.toastMsg = "Phone number must start with 0 and be 10 digits long!"
      this.messageService.add({ severity: 'error', summary: 'Error', detail: '' , key:"error"});
      return;  
    }

    const userInfo = {
      Image: this.userInfo.Image,
      FullName: this.userInfo.FullName,
      Email: this.userInfo.Email,
      PhoneNumber: this.userInfo.PhoneNumber
    } 

    const userId = localStorage.getItem("token")

    if (userId != null) {
      const userIdStr = userId.replace(/"/g, '');
      this.dataService.postAccountInfo(userIdStr, userInfo).subscribe(data => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Your information has updated!' ,key:"success"});
      })
    }
  }

  bookingHistory() {
    this.router.navigate(['booking-history'])
  }

  logOut() {
    localStorage.removeItem("token")
    window.location.reload()
  }

  

  initializeUserInfo() {
    this.userInfo.Email = ""
    this.userInfo.Image = "./assets/images/Gbus-logo-avt.png"
    this.userInfo.FullName = ""
    this.userInfo.PhoneNumber = ""
  }
}
