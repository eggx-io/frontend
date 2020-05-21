import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { EventsModule } from './events/events.module'
import { PeopleModule } from './people/people.module'
import { ProjectsModule } from './projects/projects.module'

import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { ResourcesComponent } from './resources/resources.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    ResourcesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    EventsModule,
    PeopleModule,
    ProjectsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
