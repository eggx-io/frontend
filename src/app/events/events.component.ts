import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  @Output() events: {}[] = []

  constructor() {
    for (let i = 1; i <= 10; ++i) {
      this.events.push({
        _id: 'awdawdawda',
        type: ["event", "workshop", "sponsored"][Math.floor(Math.random() * 3)],
        title: "This is an event",
        blurb: "Welcome to this event! wooo it's pretty cool yayayayayyay.",
        schedule: {
          start: Date.now(),
          end: Date.now() + 1234567 * i
        }
      })
    }
  }

  ngOnInit(): void {
  }

  getEventTypeClass(eventType: string): string {
    eventType = eventType.toLowerCase()
    if (eventType == "event") return "color-accent-darkest"
    if (eventType == "sponsored") return "color-purple"
    if (eventType == "workshop") return "color-teal-darker"
  }

  showEvent(eventId) { }

}
