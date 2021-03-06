import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LandingComponent } from "./landing/landing.component"
import { AboutComponent } from "./about/about.component"
import { EventsComponent } from "./events/events.component"
import { EventComponent } from "./event/event.component"
import { PeopleComponent } from "./people/people.component"
import { PersonComponent } from "./person/person.component"
import { ProjectsComponent } from "./projects/projects.component"
import { ProjectComponent } from "./project/project.component"
import { ResourcesComponent } from "./resources/resources.component"
import { PostComponent } from './post/post.component';
import { E404Component } from './e404/e404.component';


const routes: Routes = [
  { path: '', component: LandingComponent, pathMatch: "full" },
  { path: 'about', component: AboutComponent },
  { path: 'resources', component: ResourcesComponent },
  { path: 'events', component: EventsComponent },
  { path: 'event/:_id', component: EventComponent },
  { path: 'people', component: PeopleComponent },
  { path: 'person/:_id', component: PersonComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'project/:_id', component: ProjectComponent },
  { path: 'post/:_id', component: PostComponent },
  { path: '404', component: E404Component },
  { path: '**', component: E404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
