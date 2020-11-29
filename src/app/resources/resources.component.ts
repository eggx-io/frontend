import { Component, OnInit, Output } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ApiService } from '../api.service';
import { Event } from '../schemas/event';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesComponent implements OnInit {
  @Output() loading: boolean = false
  @Output() events: Event[] = []
  private loadedIndex: number = 0

  constructor(
    private titleService: Title,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle("Resources @ Carleton eggX")
    this.doSearch(0)
  }

  onScroll() {
    this.doSearch(this.loadedIndex);
  }

  doSearch(skip: number): void {
    if (this.loading) return;
    this.loading = true;
    this.loadedIndex = skip
    this.apiService.search('events', { schedule: { end: 99999999999999999 } }, {
      sort: { 'schedule.end': -1 },
      skip,
      limit: 10,
      projection: { resources: 1, title: 1 }
    }).subscribe(events => {
      console.log(events)
      events = events.filter(event => event.resources.length > 0)
      this.events.push(...events);
      this.loadedIndex += events.length
      this.loading = false;
    });
  }

}
