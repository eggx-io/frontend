import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {
  @Output() selectedGroup: string = "executives"
  @Output() group: {}[] = []

  constructor() {
    for (let i = 1; i <= 5; ++i) {
      this.group.push({
        title: "Vice-President",
        person: {
          profile: {
            firstName: "First",
            lastName: "Name"
          },
          avatar: "https://avatars3.githubusercontent.com/u/10460075?s=460&u=2cf7a1e881a53c113469f31b966663a11dba6e3e&v=4"
        },
        tagline: "This is our vice president, he's really cool! There isn't much else to add here, "
          + "I guess the exec could include a short message about what they like and why they're here but whatever."
      })
    }
  }

  ngOnInit(): void {
  }

  switchGroup(group) {
    if (this.selectedGroup == group) return;
    this.selectedGroup = group;
  }

}
