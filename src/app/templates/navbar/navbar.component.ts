import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Output() showDropShadow: boolean = false

  constructor() { }

  ngOnInit(): void {
    window.onscroll = () => this.showDropShadow = window.scrollY >= 25;
  }

}
