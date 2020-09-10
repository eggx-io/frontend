import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

import { environment } from '../environments/environment';
import { Schema } from './schemas/-schema';
import { QueryPopulateOptions, ModelUpdateOptions, FilterQuery } from './schemas/-mongodb.types';
import { Observable, of } from 'rxjs';
import { EventSearchOptions, Event } from './schemas/event';
import { Person, PersonSearchOptions } from './schemas/person';
import { Group, GroupSearchOptions } from './schemas/group';
import { Post, PostSearchOptions } from './schemas/post';
import { Project, ProjectSearchOptions } from './schemas/project';
import { ObjectId } from './schemas/-defaults';
import { Team, TeamSearchOptions } from './schemas/team';
import { Draft, DraftSearchOptions } from './schemas/draft';


export interface QueryOptions {
  populate?: QueryPopulateOptions[],
  projection?: { [include: string]: 1 } | { [exclude: string]: 0 }
}

export interface SearchQueryOptions {
  sort?: { [ascSortKey: string]: 1 } | { [decSortKey: string]: -1 },
  limit?: number,
  skip?: number
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private demoValues: DemoValues = new DemoValues()

  constructor(
    private http: HttpClient
  ) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      // this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  public fetch(path: "event", id: ObjectId, queryOptions?: QueryOptions): Observable<Event>
  public fetch(path: "post", id: ObjectId, queryOptions?: QueryOptions): Observable<Post>
  /**
   * Fetch a document of a specific Model
   * @param path name of the model e.g.) event
   * @param id objectid of the document
   * @param q extra query options
   */
  public fetch<T extends Schema>(path: string, id: ObjectId, queryOptions?: QueryOptions): Observable<T> {
    return this.http.post<T>(
      `${environment.api_host}/open/fetch/${path}/${id}`, { options: queryOptions }
    ).pipe(
      catchError(this.handleError<T>(`fetch ${path}`)),
      map((v: T) => environment.production || !environment.beta ? v : this.demoValues[path])
    );
  }

  /**
   * Search for documents of a specific Model based on provided conditions
   * @param path name of the search path e.g.) events
   * @param q search query
   * @param queryOptions extra query options that control what/how data is sent
   */
  public search(path: "events", q: Partial<EventSearchOptions>, queryOptions?: QueryOptions & SearchQueryOptions): Observable<Event[]>
  public search(path: "groups", q: Partial<GroupSearchOptions>, queryOptions?: QueryOptions & SearchQueryOptions): Observable<Group[]>
  public search(path: "people", q: Partial<PersonSearchOptions>, queryOptions?: QueryOptions & SearchQueryOptions): Observable<Person[]>
  public search(path: "posts", q: Partial<PostSearchOptions>, queryOptions?: QueryOptions & SearchQueryOptions): Observable<Post[]>
  public search(path: "projects", q: Partial<ProjectSearchOptions>, queryOptions?: QueryOptions & SearchQueryOptions): Observable<Project[]>
  public search(path: "teams", q: Partial<TeamSearchOptions>, queryOptions?: QueryOptions & SearchQueryOptions): Observable<Team[]>
  public search(path: "drafts", q: Partial<DraftSearchOptions>, queryOptions?: QueryOptions & SearchQueryOptions): Observable<Draft[]>
  public search<T extends Schema>(path: string, q: { [key: string]: any }, queryOptions?: QueryOptions & SearchQueryOptions): Observable<T[]> {
    return this.http.post<T[]>(
      `${environment.api_host}/open/search/${path}`, { q, options: queryOptions }
    ).pipe(
      catchError(this.handleError<T[]>(`search ${path}`)),
      map((v: T[]) => (environment.production || !environment.beta) ? v : this.demoValues[path])
    );
  }

  /**
   * Update a document of a specific Model based on provided conditions
   * @param path name of the admin path e.g.) events
   * @param conditions select which document(s) should get updated
   * @param doc the value of the fields you want to update
   * @param options define how documents are updated (use options.multi to update multiple documents at a time)
   */
  public update<T extends Schema>(
    path: 'event' | 'group' | 'person' | 'post' | 'project' | 'team' | 'draft',
    conditions: FilterQuery<T>,
    doc: Partial<T>,
    options?: ModelUpdateOptions
  ): Observable<void> {
    return this.http.post(
      `${environment.api_host}/admin/update/${path}`, { conditions, doc, options: options }, {responseType: 'text'}
    ).pipe(
      catchError(this.handleError<void>(`update ${path}`)),
      map(() => null)
    );
  }

  /**
   * Update a document of a specific Model based on provided conditions **and** provides the document itself
   * @param path name of the admin path e.g.) events
   * @param conditions select which document(s) should get updated
   * @param doc the value of the fields you want to update
   * @param options define how documents are updated (use options.multi to update multiple documents at a time)
   */
  public findOneAndUpdate<T extends Schema>(
    path: 'event' | 'group' | 'person' | 'post' | 'project' | 'team' | 'draft',
    conditions: FilterQuery<T>,
    doc: Partial<T>,
    options?: ModelUpdateOptions
  ): Observable<T> {
    return this.http.post<T>(
      `${environment.api_host}/admin/update/${path}`, { conditions, doc, options: {...options, find: true} }
    ).pipe(
      catchError(this.handleError<T>(`findOneAndUpdate ${path}`)),
      map((v: T) => environment.production || !environment.beta ? v : this.demoValues[path])
    );
  }
}

class DemoValues {
  drafts: Draft[] = [
    {
      name: 'Fall 2020',
      number: 1,
      start: Date.now(),
      end: Date.now() + 1234567
    },
    {
      name: 'Winter 2020',
      number: 2,
      start: Date.now() + 1234568,
      end: Date.now() + 1234568 + 1234567
    }
  ]
  draft = this.drafts[0]
  events: Event[] = (() => {
    const events = []
    for (let i = 1; i <= 10; ++i) {
      events.push({
        _id: objectidExample,
        type: ["event", "workshop", "sponsored"][Math.floor(Math.random() * 3)],
        title: "This is an event",
        blurb: "Welcome to this event! wooo it's pretty cool yayayayayyay.",
        description: markdownExample,
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
    return events
  })()
  event = this.events[0]
  groups: Group[] = (() => {
    const exec = {
      name: "Executives",
      people: []
    }
    const alum = {
      name: "Alumni",
      people: []
    }
    for (let i = 1; i <= 5; ++i) {
      exec.people.push({
        title: "Vice-President",
        person: {
          _id: objectidExample,
          email: "",
          profile: {
            firstName: "Exec",
            lastName: "Member"
          },
          avatar: "assets/square.jpg"
        },
        tagline: "This is our vice president, he's really cool! There isn't much else to add here, "
          + "I guess the exec could include a short message about what they like and why they're here but whatever."
      })
      alum.people.push({
        person: {
          _id: objectidExample,
          email: "",
          profile: {
            firstName: "Alumni",
            lastName: "Student"
          },
          avatar: "assets/square.jpg"
        },
        tagline: "This is our vice president, he's really cool! There isn't much else to add here, "
          + "I guess the exec could include a short message about what they like and why they're here but whatever."
      })
    }
    return [exec, alum]
  })()
  group = this.groups[0]
  posts: Post[] = (() => {
    return [{
      _id: objectidExample,
      title: "eggX is under construction",
      author: {
        _id: objectidExample,
        email: "",
        profile: {
          firstName: "Exec",
          lastName: "Member"
        },
        avatar: "assets/square.jpg",
        log: {
          createdDate: Date.now()
        }
      },
      blurb: "\
Thank you for taking an interest in Carleton eggX. Our website is currently under development. \
You will notice some placeholder text around the website. That is because we're still \
updating our database with real data. Once we're done with that process, this website will \
become fully populated with real information. Thank you for your patience.",
      content: markdownExample,
      featuredImage: "assets/construction.jpg",
      spotlight: true,
      tags: []
    }, {
      _id: objectidExample,
      title: "Site just launched, check it out",
      author: objectidExample,
      blurb: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In commodo blandit lorem, eu faucibus mi sodales in. Suspendisse nec",
      content: markdownExample,
      featuredImage: "assets/payment.jpg",
      spotlight: false,
      tags: []
    }, {
      _id: objectidExample,
      title: "AngularJS Workshop",
      author: objectidExample,
      blurb: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In commodo blandit lorem, eu faucibus mi sodales in. Suspendisse nec",
      content: markdownExample,
      featuredImage: "assets/payment.jpg",
      spotlight: false,
      tags: []
    }, {
      _id: objectidExample,
      title: "Semester-long Hackathon",
      author: objectidExample,
      blurb: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In commodo blandit lorem, eu faucibus mi sodales in. Suspendisse nec",
      content: markdownExample,
      featuredImage: "assets/payment.jpg",
      spotlight: false,
      tags: []
    }]
  })()
  post = this.posts[0]
  projects: Project[] = (() => {
    const domains = ["web", "mobile", "ai"], projects = []
    for (let i = 0; i < 25; ++i) {
      const l = (Math.random() * 5);
      const members = [];
      for (let j = 1; j < l; ++j)
        members.push("awdawd")
      projects.push({
        _id: objectidExample,
        name: "This is a project",
        team: {
          draft: "awdaw",
          name: "Awdad",
          members,
          mentor: "adwa"
        },
        featuredImage: "assets/payment.jpg",
        domain: domains[i % 3]
      })
    }
    return projects
  })()
  project = this.projects[0]
  teams: Team[] = [{
    draft: this.draft,
    members: [objectidExample],
    mentor: objectidExample,
    name: 'Test Team'
  }]
  team = this.teams[0]
}

const objectidExample: ObjectId = "507f1f77bcf86cd799439011"

const markdownExample: string = "\
# Welcome to this event\n\n\n\
_wooo it's pretty cool_\n\
**yayayayayyay.**\n\n\n\
## adhauwdhauwh\n\n\n\
dawdawd\n\n\n\
### dbwbaudjawduawduha\n\n\n\
awdawd\n\n\n\
#### jdhuaw kjdah bnjkdn kjawbdaw jdjb waknb wa\n\n\n\
```python\n\
def hello(wow):\n\
\t#woah\n\
\tglobal hi_text\n\
\tprint(hi_text)\n\
\traise ValueError('what?')\n\
```\n\
# Welcome to this event\n\n\n\
_wooo it's pretty cool_\n\
**yayayayayyay.**\n\n\n\
## adhauwdhauwh\n\n\n\
dawdawd\n\n\n\
### dbwbaudjawduawduha\n\n\n\
awdawd\n\n\n\
#### jdhuaw kjdah bnjkdn kjawbdaw jdjb waknb wa\n\n\n\
```python\n\
def hello(wow):\n\
\t#woah\n\
\tglobal hi_text\n\
\tprint(hi_text)\n\
\traise ValueError('what?')\n\
```"
