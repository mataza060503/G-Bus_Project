import { Component } from '@angular/core';
import { DataService } from '../../services/Data.service';
import { Notification } from '../../models/ticket';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss'
})
export class NotificationsComponent {
  notifications: Notification[] = []
  dailyNoti: Notification[] = []
  weeklyNoti: Notification[] = []
  monthlyNoti: Notification[] = []
  errMessage: string = ""
  userId: string = ""
  isDaily: boolean = false
  isWeekly: boolean = false
  isMonthly: boolean = false

  constructor(private dataService: DataService) {
    const userIdRaw = localStorage.getItem("token")
    if (userIdRaw != null) {
      const userId = userIdRaw.replace(/"/g,'');
      this.userId = userId
    }
    this.loadData()
  }

  loadData() {
    this.dataService.getNotification(this.userId).subscribe({
      next: (data) => {
        this.notifications = data
        console.log(this.notifications)
        this.processNotification(this.notifications)
      }, error: (err) => {
        this.errMessage = err
      }
    })
  }

  processNotification(notifications: Notification[]) {
    const currentDate = new Date();
    const today = currentDate.getDate();
    const currentMonth = currentDate.getMonth();

    notifications.forEach(noti => {
      const notiDate = new Date(noti.Time);
      const notiDay = notiDate.getDate();
      const notiMonth = notiDate.getMonth();

      // Calculate the difference in days
      const dayDifference = Math.floor((currentDate.getTime() - notiDate.getTime()) / (1000 * 3600 * 24));

      if (notiDay === today && notiMonth === currentMonth) {
        this.dailyNoti.push(noti);
        this.isDaily = true
      } else if (dayDifference > 0 && dayDifference <= 7) {
        this.weeklyNoti.push(noti);
        this.isWeekly = true
      } else if (dayDifference > 7 && dayDifference <= 30) {
        this.monthlyNoti.push(noti);
        this.isMonthly = true
      }
    });
  }

  formatTime(dateInput: any, isDaily: boolean): string {
    // Attempt to create a Date object from the input if it is not already one
    const date = dateInput instanceof Date ? dateInput : new Date(dateInput);
  
    // Validate the date object
    if (isNaN(date.getTime())) {
      console.error('Invalid date:', dateInput);
      return 'Invalid date'; // Return a placeholder or handle the error as appropriate
    }
  
    if (isDaily) {
      // Formatting for daily notifications: "HH:MM"
      return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    } else {
      // Formatting for non-daily notifications: "Ddd, M/D/YYYY HH:MM"
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      return `${days[date.getDay()]}, ${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    }
  }
  
}
