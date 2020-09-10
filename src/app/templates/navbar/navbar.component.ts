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
    { name: 'About', href: '/about' },
    { name: 'People', href: '/people' },
    { name: 'Events', href: '/events' },
    // {name: 'Projects', href: '/projects'},
    { name: 'Resources', href: '/resources' },
    { name: '+ Join the club', href: 'https://carletoncse.typeform.com/to/fSG5ssi6'}
  ]

  constructor() { }

  ngOnInit(): void {
    const navbarHeight = document.getElementById('navbar').clientHeight
    window.onscroll = () => this.showDropShadow = window.scrollY >= navbarHeight;
  }

}
