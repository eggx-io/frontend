import { Component, OnInit, Output } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Person } from '../schemas/person';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {
  @Output() person: Person

  constructor(
    private titleService: Title
  ) {
    this.person = {
      email: "",
      profile: {
        firstName: "First",
        lastName: "Name"
      },
      avatar: "https://avatars3.githubusercontent.com/u/10460075?s=460&u=2cf7a1e881a53c113469f31b966663a11dba6e3e&v=4"
    }
    titleService.setTitle(`${this.person.profile.firstName} ${this.person.profile.lastName} @ Carleton eggX`)
  }

  ngOnInit(): void {
  }

}
