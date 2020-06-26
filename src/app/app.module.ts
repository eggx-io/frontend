import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MarkdownModule } from 'ngx-markdown';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

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
import { LandingComponent } from './landing/landing.component';

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
    ResourcesComponent,
    LandingComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatNativeDateModule,
    MatDatepickerModule,
    TemplatesModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MarkdownModule.forRoot(),
    InfiniteScrollModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
