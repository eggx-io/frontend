import { Component, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';
import { Group } from '../schemas/group'
import { ApiService } from '../api.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {
  @Output() selectedGroup: string = "executives"
  @Output() groups: Group[]
  @Output() people: Group["people"]

  constructor(
    private location: Location,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.apiService.search('groups', {}, {
      projection: {
        name: 1,
        people: 1
      },
      populate: {
        path: 'people.person',
        select: 'avatar profile.firstName profile.lastName'
      }
    }).subscribe(groups => {
      if (groups) {
        this.groups = groups;
        this.people = (
          groups.find(g => g.name.toLowerCase() == this.selectedGroup)
          || groups[0]).people;
      }
    })
  }

  switchGroup(group) {
    if (this.selectedGroup == group) return;
    this.selectedGroup = group.toLowerCase();
    this.people = this.groups
      .find(g => g.name.toLowerCase() == this.selectedGroup)
      .people;
  }

}
