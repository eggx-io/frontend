import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Output() showDropShadow: boolean = false
  @Output() menuOpen: boolean = false
  @Output() menuItems = [
    {name: 'About', href: '/about'},
    {name: 'People', href: '/people'},
    {name: 'Events', href: '/events'},
    // {name: 'Projects', href: '/projects'},
    {name: 'Resources', href: '/resources'}
  ]

  constructor() { }

  ngOnInit(): void {
    window.onscroll = () => this.showDropShadow = window.scrollY >= 25;
  }

}
