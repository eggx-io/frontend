import { Component, OnInit, Input, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Event, EventSearchOptions } from '../schemas/event';
import { ApiService, QueryOptions } from '../api.service';
import { ObjectId } from '../schemas/-defaults';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  @Output() loading: boolean = false
  @Output() events: Event[] = []
  @Output() showPopup: boolean
  @Output() popupEvent: Event
  @Input() @Output() form: EventSearchOptions

  static readonly queryProjection: QueryOptions["projection"] = {
    type: 1,
    title: 1,
    blurb: 1,
    description: 1,
    schedule: 1
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle("Events @ Carleton eggX");
    this.form = {
      type: ["event", "sponsored", "workshop"],
      schedule: {
        start: Date.now()
      }
    }
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['event']) {
        this.doFetch(params['event']);
      } else {
        this.doSearch();
      }
    });
  }

  filterSearch(): void { }

  onScroll() {
    if (!this.popupEvent) this.doSearch(10);
  }

  doFetch(id: ObjectId): void {
    if (this.loading) return;
    this.loading = true;
    this.showPopup = true;
    this.apiService.fetch('event', id, {
      projection: EventsComponent.queryProjection
    }).subscribe(event => {
      this.loading = false;
      this.popupEvent = event;
      this.showPopup = event != null;
    })
  }

  doSearch(skip = undefined): void {
    if (this.loading) return;
    this.loading = true;
    this.apiService.search('events', this.form, {
      skip: skip,
      limit: 10,
      projection: EventsComponent.queryProjection
    }).subscribe(events => {
      this.events.push(...events);
      this.loading = false;
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

  showEvent(event: Event): void {
    this.showPopup = true;
    this.popupEvent = event;
    this.router.navigate(
      [],
      {
        relativeTo: this.activatedRoute,
        queryParams: { event: event._id }
      });
  }

  hideEvent(): void {
    this.showPopup = false;
    this.popupEvent = null;
    this.router.navigate(
      [],
      {
        relativeTo: this.activatedRoute,
        queryParams: {}
      });
  }

  typeIsFiltered(type: string): boolean {
    return this.form.type.indexOf(type) != -1;
  }

  toggleTypeFilter(type: string): void {
    const index = this.form.type.indexOf(type)
    if (index != -1) this.form.type.splice(index, 1)
    else this.form.type.push(type)
  }

}
