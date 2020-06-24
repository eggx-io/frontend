import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LandingComponent } from "./landing/landing.component"
import { AppComponent } from "./app.component"
import { AboutComponent } from "./about/about.component"
import { EventsComponent } from "./events/events.component"
import { EventComponent } from "./event/event.component"
import { PeopleComponent } from "./people/people.component"
import { PersonComponent } from "./person/person.component"
import { ProjectsComponent } from "./projects/projects.component"
import { ProjectComponent } from "./project/project.component"
import { ResourcesComponent } from "./resources/resources.component"


const routes: Routes = [
  { path: '', component: LandingComponent, pathMatch: "full" },
  { path: 'about', component: AboutComponent },
  { path: 'resources', component: ResourcesComponent },
  { path: 'events', component: EventsComponent },
  { path: 'event/_id', component: EventComponent },
  { path: 'people', component: PeopleComponent },
  { path: 'person/:_id', component: PersonComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'project/:_id', component: ProjectComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
