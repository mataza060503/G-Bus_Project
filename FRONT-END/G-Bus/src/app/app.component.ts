import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'jquery/dist/jquery.min.js';
import 'slick-carousel/slick/slick.min.js';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit{
  title = 'G-Bus';
  
  constructor(private router: Router) {

  }

  ngOnInit(): void {
    this.router.navigate([{ outlets: { 'auth-popup': ['login-phoneNumber'] } }]);

    const btnHeaderLogin = document.getElementById("btnHeaderLogin")
    const screenBackground = document.getElementById("screenBackground") as HTMLElement
    const popup = document.getElementById("popup")
    console.log(popup)

    btnHeaderLogin?.addEventListener("click", () => {
      if (popup !== null) {
        popup.style.display = "block";
        screenBackground.addEventListener("click", () => {
          popup.style.display = "none";
        })
      }
    })
    
  }
}
