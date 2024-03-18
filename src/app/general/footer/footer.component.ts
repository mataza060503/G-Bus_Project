import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  gbus:string = "gbus@gmail.com"
  copyright:string = "Copyright © 2024 | GBus - All rights reserved"
}
