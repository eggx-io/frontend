import { Component, OnInit, Output } from '@angular/core';
import { Event } from '../schemas/event';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  @Output() events: Event[] = []
  @Output() popupEvent: Event

  constructor() {
    for (let i = 1; i <= 10; ++i) {
      this.events.push({
        _id: 'awdawdawda',
        type: ["event", "workshop", "sponsored"][Math.floor(Math.random() * 3)],
        title: "This is an event",
        blurb: "Welcome to this event! wooo it's pretty cool yayayayayyay.",
        description: "Welcome to this event! wooo it's pretty cool yayayayayyay.\n\n\nadhauwdhauwh dbwbaudjawduawduha jdhuaw kjdah bnjkdn kjawbdaw jdjb waknb wa \n\ndajwh dajw hduwah uhawu dhuw na hwaubdkajndwau bawd bawj dauwk nadw \n\n abwdkjbawkduawb kdb wahbd kawb awjkn dbkjawb jkab jkwb kjadw jk abjw ",
        schedule: {
          start: Date.now(),
          end: Date.now() + 1234567 * i
        },
        people: {
          author: "wad",
          hosts: []
        }
      })
    }
  }

  ngOnInit(): void {
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

  showEvent(eventId) { }

}
