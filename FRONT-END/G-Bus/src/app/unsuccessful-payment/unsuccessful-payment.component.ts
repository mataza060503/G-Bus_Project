import { Component } from '@angular/core';
import { DataService } from '../../services/Data.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-unsuccessful-payment',
  templateUrl: './unsuccessful-payment.component.html',
  styleUrl: './unsuccessful-payment.component.scss'
})
export class UnsuccessfulPaymentComponent {
  constructor(private dataService: DataService, private messageService: MessageService) {
    this.pushNotification()
  }

  pushNotification() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Your information has updated!' ,key:"success"});
  }
}
