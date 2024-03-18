import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class HeaderComponent {
  selectedLink: string = '';
  constructor() {

  }

  

  HeaderNavSelected(event: Event, link: string) {
    event.preventDefault(); // Prevents the default action of clicking on a link

    // Remove the active class from the previously clicked link
    this.selectedLink = '';

    // Set the selected link
    this.selectedLink = link;
  }

 

}
