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
  private loadedIndex: number = 0

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
        this.titleService.setTitle("Events @ Carleton eggX");
        this.doSearch(0)
        // this.doSetup()
      }
    });
  }

  filterSearch(): void { }

  onScroll() {
    if (!this.popupEvent) this.doSearch(this.loadedIndex);
  }

  doSetup() {
    this.apiService.update<Event>('event', {title: 'Welcome to eggX'}, {
      type: 'event',
      title: 'Welcome to eggX',
      blurb: 'Come meet the crew, learn about who we are and socialize!',
      description: 'pending',
      schedule: {
        start: new Date(2020, 8, 12, 19).getTime(),
        end: new Date(2020, 8, 12, 22).getTime()
      },
      location: { text: 'Virtual - Microsoft Teams' }
    }, {upsert: true}).subscribe()
    this.apiService.update<Event>('event', {title: 'Introduction to web apps'}, {
      type: 'workshop',
      title: 'Introduction to web apps',
      blurb: 'Learn about why web apps exist, what they do and how we can use them to make awesome things!',
      description: 'pending',
      schedule: {
        start: new Date(2020, 8, 23, 19).getTime(),
        end: new Date(2020, 8, 23, 21).getTime()
      },
      location: { text: 'Virtual - Microsoft Teams' }
    }, {upsert: true}).subscribe()
    this.apiService.update<Event>('event', {title: "What's the problem?"}, {
      type: 'workshop',
      title: "What's the problem?",
      blurb: 'How to answer the why, how and what questions in software engineering',
      description: 'pending',
      schedule: {
        start: new Date(2020, 8, 16, 19).getTime(),
        end: new Date(2020, 8, 16, 21).getTime()
      },
      location: { text: 'Virtual - Microsoft Teams' }
    }, {upsert: true}).subscribe()
    this.apiService.update<Event>('event', {title: "Find yourself a team"}, {
      type: 'event',
      title: "Find yourself a team",
      blurb: 'An opportunity to meet other members and partner up!',
      description: 'pending',
      schedule: {
        start: new Date(2020, 8, 19, 20).getTime(),
        end: new Date(2020, 8, 19, 21).getTime()
      },
      location: { text: 'Virtual - Microsoft Teams' }
    }, {upsert: true}).subscribe()
    this.apiService.update<Event>('event', {title: "How to build a web server with Express"}, {
      type: 'workshop',
      title: "How to build a web server with Express",
      blurb: 'Learn how to use one of the most widly used https server frameworks!',
      description: 'pending',
      schedule: {
        start: new Date(2020, 9, 3, 19).getTime(),
        end: new Date(2020, 9, 3, 21).getTime()
      },
      location: { text: 'Virtual - Microsoft Teams' }
    }, {upsert: true}).subscribe()
    this.apiService.update<Event>('event', {title: "Design engaging UX with Figma"}, {
      type: 'workshop',
      title: "Design engaging UX with Figma",
      blurb: 'Practice designing captivating mobile-first user experiences',
      description: 'pending',
      schedule: {
        start: new Date(2020, 8, 26, 19).getTime(),
        end: new Date(2020, 8, 26, 21).getTime()
      },
      location: { text: 'Virtual - Microsoft Teams' }
    }, {upsert: true}).subscribe()
    this.apiService.update<Event>('event', {title: "Understanding the Android lifecycle"}, {
      type: 'workshop',
      title: "Understanding the Android lifecycle",
      blurb: "We'll go over the possible states your app can be in on Android",
      description: 'pending',
      schedule: {
        start: new Date(2020, 9, 3, 19).getTime(),
        end: new Date(2020, 9, 3, 21).getTime()
      },
      location: { text: 'Virtual - Microsoft Teams' }
    }, {upsert: true}).subscribe()
    this.apiService.update<Event>('event', {title: "Simplify your data with well-defined models"}, {
      type: 'workshop',
      title: "Simplify your data with well-defined models",
      blurb: "Practive taking time to carefully construct your data structures in this workshop",
      description: 'pending',
      schedule: {
        start: new Date(2020, 9, 10, 19).getTime(),
        end: new Date(2020, 9, 10, 21).getTime()
      },
      location: { text: 'Virtual - Microsoft Teams' }
    }, {upsert: true}).subscribe()
    this.apiService.update<Event>('event', {title: "Building a Vanilla Javascript web app"}, {
      type: 'workshop',
      title: "Building a Vanilla Javascript web app",
      blurb: "Learn what it takes to bring your webpages to life!",
      description: 'pending',
      schedule: {
        start: new Date(2020, 9, 17, 19).getTime(),
        end: new Date(2020, 9, 17, 21).getTime()
      },
      location: { text: 'Virtual - Microsoft Teams' }
    }, {upsert: true}).subscribe()
    this.apiService.update<Event>('event', {title: "Learn the magic of Angular"}, {
      type: 'workshop',
      title: "Learn the magic of Angular",
      blurb: "We love Angular at eggX and you'll see why in this session",
      description: 'pending',
      schedule: {
        start: new Date(2020, 9, 24, 19).getTime(),
        end: new Date(2020, 9, 24, 21).getTime()
      },
      location: { text: 'Virtual - Microsoft Teams' }
    }, {upsert: true}).subscribe()
    this.apiService.update<Event>('event', {title: "Going serverless - Hosting a web server on the cloud"}, {
      type: 'workshop',
      title: "Going serverless - Hosting a web server on the cloud",
      blurb: "How exactly do you get code onto the internet?",
      description: 'pending',
      schedule: {
        start: new Date(2020, 9, 31, 19).getTime(),
        end: new Date(2020, 9, 31, 21).getTime()
      },
      location: { text: 'Virtual - Microsoft Teams' }
    }, {upsert: true}).subscribe()
    this.apiService.update<Event>('event', {title: "Know your audience & evaluate your work"}, {
      type: 'workshop',
      title: "Know your audience & evaluate your work",
      blurb: "We'll show you some ways to check if the code you wrote is the code you were meant to write",
      description: 'pending',
      schedule: {
        start: new Date(2020, 10, 7, 19).getTime(),
        end: new Date(2020, 10, 7, 21).getTime()
      },
      location: { text: 'Virtual - Microsoft Teams' }
    }, {upsert: true}).subscribe()
    this.apiService.update<Event>('event', {title: "How to maintain secure access to the cloud"}, {
      type: 'workshop',
      title: "How to maintain secure access to the cloud",
      blurb: "Securing software is one of the trickiest problems companies face. We're no experts but we can give you some tips",
      description: 'pending',
      schedule: {
        start: new Date(2020, 10, 14, 19).getTime(),
        end: new Date(2020, 10, 14, 21).getTime()
      },
      location: { text: 'Virtual - Microsoft Teams' }
    }, {upsert: true}).subscribe()
    this.apiService.update<Event>('event', {title: "Publishing an app to the Google Play Store"}, {
      type: 'workshop',
      title: "Publishing an app to the Google Play Store",
      blurb: "Let's get your beautiful app out there! Note: Google charges a one-time fee during this process.",
      description: 'pending',
      schedule: {
        start: new Date(2020, 10, 21, 19).getTime(),
        end: new Date(2020, 10, 21, 21).getTime()
      },
      location: { text: 'Virtual - Microsoft Teams' }
    }, {upsert: true}).subscribe()
    this.apiService.update<Event>('event', {title: "Writing lightning-fast code"}, {
      type: 'workshop',
      title: "Writing lightning-fast code",
      blurb: "Review some methods you can use to make your code highly efficient",
      description: 'pending',
      schedule: {
        start: new Date(2020, 10, 28, 19).getTime(),
        end: new Date(2020, 10, 28, 21).getTime()
      },
      location: { text: 'Virtual - Microsoft Teams' }
    }, {upsert: true}).subscribe()
    // this.doSearch();
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
      if (event != null) {
        this.titleService.setTitle(`${event.title} - Event @ Carleton eggX`)
      }
    })
  }

  doSearch(skip: number): void {
    if (this.loading) return;
    this.loading = true;
    this.loadedIndex = skip
    this.apiService.search('events', this.form, {
      sort: {'schedule.start': 1},
      skip,
      limit: 10,
      projection: EventsComponent.queryProjection
    }).subscribe(events => {
      this.events.push(...events);
      this.loadedIndex += events.length
      console.log(events.length)
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

  eventSpansMultipleDays(event: Event): boolean {
    return new Date(event.schedule.end).getDate() != new Date(event.schedule.start).getDate()
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
    this.titleService.setTitle("Events @ Carleton eggX");
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
