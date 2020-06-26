import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

import { environment } from '../environments/environment';
import { Schema } from './schemas/-schema';
import { Observable, of } from 'rxjs';
import { EventSearchOptions, Event } from './schemas/event';
import { Person, PersonSearchOptions } from './schemas/person';
import { Group, GroupSearchOptions } from './schemas/group';
import { Post, PostSearchOptions } from './schemas/post';
import { Project, ProjectSearchOptions } from './schemas/project';
import { ObjectId } from './schemas/-defaults';

interface QueryPopulateOptions {
  /** space delimited path(s) to populate */
  path: string;
  /** optional fields to select */
  select?: any;
  /** optional query conditions to match */
  match?: any;
  /** optional model to use for population */
  model?: string;
  /** optional query options like sort, limit, etc */
  options?: any;
  /** deep populate */
  populate?: QueryPopulateOptions | QueryPopulateOptions[];
}

export interface QueryOptions {
  populate?: QueryPopulateOptions | QueryPopulateOptions[],
  sort?: object,
  limit?: number,
  skip?: number,
  projection?: { [include: string]: 1 } | { [exclude: string]: 0 }
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private demoValues: DemoValues = new DemoValues()

  constructor(
    private http: HttpClient
  ) { }

  private flattenQueryOptions(body: object): string {
    const flatten = (obj, parent = undefined) =>
      Object.entries(obj)
        .map(([k, v]) => {
          const key = parent ? `${parent}.${k}` : `${k}`
          return v === Object(v) ?
            `${encodeURIComponent(key)}=${encodeURIComponent(JSON.stringify(v))}` :
            `${encodeURIComponent(key)}=${encodeURIComponent(String(v))}`
        })
        .join('&');
    const arr = flatten(body);
    return arr ? `?${arr}` : '';
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      // this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  public fetch(path: "event", id: ObjectId, queryOptions?: QueryOptions): Observable<Event>
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
      map((v: T) => environment.production ? v : !!v ? v : this.demoValues[path])
    );
  }

  public search(path: "events", q: EventSearchOptions, queryOptions?: QueryOptions): Observable<Event[]>
  public search(path: "groups", q: GroupSearchOptions, queryOptions?: QueryOptions): Observable<Group[]>
  public search(path: "people", q: PersonSearchOptions, queryOptions?: QueryOptions): Observable<Person[]>
  public search(path: "posts", q: PostSearchOptions, queryOptions?: QueryOptions): Observable<Post[]>
  public search(path: "projects", q: ProjectSearchOptions, queryOptions?: QueryOptions): Observable<Project[]>
  /**
   * Search for documents of a specific Model based on provided conditions
   * @param path name of the search path e.g.) events
   * @param q search query & extra query options
   */
  public search<T extends Schema>(path: string, q: { [key: string]: string | number | boolean }, queryOptions?: QueryOptions): Observable<T[]> {
    return this.http.post<T[]>(
      `${environment.api_host}/open/search/${path}`, { q: q, options: queryOptions }
    ).pipe(
      catchError(this.handleError<T[]>(`search ${path}`)),
      map((v: T[]) => environment.production ? v : v.length > 0 ? v : this.demoValues[path])
    );
  }
}

class DemoValues {
  events: Event[] = (() => {
    const events = []
    for (let i = 1; i <= 10; ++i) {
      events.push({
        _id: '507f1f77bcf86cd799439011',
        type: ["event", "workshop", "sponsored"][Math.floor(Math.random() * 3)],
        title: "This is an event",
        blurb: "Welcome to this event! wooo it's pretty cool yayayayayyay.",
        description: "\
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
          ```",
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
          _id: "507f1f77bcf86cd799439011",
          email: "",
          profile: {
            firstName: "Exec",
            lastName: "Member"
          },
          avatar: "https://images.unsplash.com/photo-1495615080073-6b89c9839ce0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60"
        },
        tagline: "This is our vice president, he's really cool! There isn't much else to add here, "
          + "I guess the exec could include a short message about what they like and why they're here but whatever."
      })
      alum.people.push({
        person: {
          _id: "507f1f77bcf86cd799439011",
          email: "",
          profile: {
            firstName: "Alumni",
            lastName: "Student"
          },
          avatar: "https://images.unsplash.com/photo-1495615080073-6b89c9839ce0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60"
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
      title: "Site just launched, check it out",
      author: "adadwa",
      blurb: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In commodo blandit lorem, eu faucibus mi sodales in. Suspendisse nec",
      content: "",
      featuredImage: "https://images.unsplash.com/photo-1556742111-a301076d9d18?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
      spotlight: true,
      tags: []
    }, {
      title: "AngularJS Workshop",
      author: "adadwa",
      blurb: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In commodo blandit lorem, eu faucibus mi sodales in. Suspendisse nec",
      content: "",
      featuredImage: "https://images.unsplash.com/photo-1556742111-a301076d9d18?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
      spotlight: false,
      tags: []
    }, {
      title: "Semester-long Hackathon",
      author: "adadwa",
      blurb: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In commodo blandit lorem, eu faucibus mi sodales in. Suspendisse nec",
      content: "",
      featuredImage: "https://images.unsplash.com/photo-1556742111-a301076d9d18?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
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
        _id: "507f1f77bcf86cd799439011",
        name: "This is a project",
        team: {
          draft: "awdaw",
          name: "Awdad",
          members,
          mentor: "adwa"
        },
        featuredImage: "https://images.unsplash.com/photo-1556742111-a301076d9d18?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
        domain: domains[i % 3]
      })
    }
    return projects
  })()
  project = this.projects[0]
}
