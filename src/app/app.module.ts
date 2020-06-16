import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MarkdownModule } from 'ngx-markdown';

import { AppRoutingModule } from './app-routing.module';

import { TemplatesModule } from './templates/templates.module'

import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { EventsComponent } from './events/events.component';
import { EventComponent } from './event/event.component';
import { PeopleComponent } from './people/people.component';
import { PersonComponent } from './person/person.component';
import { ProjectComponent } from './project/project.component';
import { ProjectsComponent } from './projects/projects.component';
import { ResourcesComponent } from './resources/resources.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    EventsComponent,
    EventComponent,
    PeopleComponent,
    PersonComponent,
    ProjectComponent,
    ProjectsComponent,
    ResourcesComponent
  ],
  imports: [
    BrowserModule,
    MarkdownModule.forRoot(),
    TemplatesModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
