import { Component, OnInit, Input, Output } from '@angular/core';
import { dateStructure } from '../schemas/-defaults';
import { Event, EventSearchOptions } from '../schemas/event';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  @Output() events$: Observable<Event[]>
  @Output() popupEvent: Event
  @Input() @Output() form: EventSearchOptions

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.form = {
      type: ["event", "sponsored", "workshop"],
      schedule: {
        start: Date.now()
      }
    }
    this.doSearch()
  }

  filterSearch(): void {}

  doSearch(skip = undefined) {
    this.events$ = this.apiService.search('events', this.form, {
      skip: skip,
      limit: 10,
      projection: {
        type: 1,
        title: 1,
        blurb: 1,
        description: 1,
        schedule: 1
      }
    });
  }

  stopPropagation() {
    this.stopPropagation();
  }

  getEventTypeClass(eventType: string): string {
    eventType = eventType.toLowerCase()
    if (eventType == "event") return "color-accent-darkest"
    if (eventType == "sponsored") return "color-purple"
    if (eventType == "workshop") return "color-teal-darker"
  }

  showEvent(eventId): void { }

  typeIsFiltered(type): boolean {
    return this.form.type.indexOf(type) != -1;
  }

  toggleTypeFilter(type): void {
    const index = this.form.type.indexOf(type)
    if (index != -1) this.form.type.splice(index, 1)
    else this.form.type.push(type)
  }

}
