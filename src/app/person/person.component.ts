import { Component, OnInit, Output } from '@angular/core';
import { Person } from '../schemas/person';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {
  @Output() person: Person

  constructor() {
    this.person = {
      email: "",
      profile: {
        firstName: "First",
        lastName: "Name"
      },
      avatar: "https://avatars3.githubusercontent.com/u/10460075?s=460&u=2cf7a1e881a53c113469f31b966663a11dba6e3e&v=4"
    }
  }

  ngOnInit(): void {
  }

}
