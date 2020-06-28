import { Component, OnInit, Output } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Group } from '../schemas/group'
import { ApiService } from '../api.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {
  @Output() loading: boolean
  @Output() selectedGroup: string = "executives"
  @Output() groups: Group[] = []
  @Output() people: Group["people"] = []

  constructor(
    private apiService: ApiService,
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle("People @ Carleton eggX");
    this.doSearch();
  }

  doSearch(): void {
    if (this.loading) return;
    this.loading = true;
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
      this.groups.splice(0, this.groups.length, ...groups);
      if (this.groups) {
        const selectedGroup = this.groups.find(g => g.name.toLowerCase() == this.selectedGroup) || this.groups[0];
        this.people.splice(
          0,
          this.people.length,
          ...selectedGroup.people
        );
        this.titleService.setTitle(`${selectedGroup.name} @ Carleton eggX`)
      }
      this.loading = false;
    })
  }

  switchGroup(group: string): void {
    if (this.selectedGroup == group) return;
    this.selectedGroup = group.toLowerCase();
    const selectedGroup = this.groups.find(g => g.name.toLowerCase() == this.selectedGroup) || this.groups[0];
    this.people.splice(
      0,
      this.people.length,
      ...selectedGroup.people
    );
    this.titleService.setTitle(`${selectedGroup.name} @ Carleton eggX`);
  }

}
