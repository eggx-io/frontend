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
  projection?: { [include: string]: 1 } | { [exclude: string]: 0 }
}

export interface SearchQueryOptions {
  sort?: object,
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
      map((v: T) => environment.production && !environment.beta ? v : !!v ? v : this.demoValues[path])
    );
  }

  public search(path: "events", q: EventSearchOptions, queryOptions?: QueryOptions & SearchQueryOptions): Observable<Event[]>
  public search(path: "groups", q: GroupSearchOptions, queryOptions?: QueryOptions & SearchQueryOptions): Observable<Group[]>
  public search(path: "people", q: PersonSearchOptions, queryOptions?: QueryOptions & SearchQueryOptions): Observable<Person[]>
  public search(path: "posts", q: PostSearchOptions, queryOptions?: QueryOptions & SearchQueryOptions): Observable<Post[]>
  public search(path: "projects", q: ProjectSearchOptions, queryOptions?: QueryOptions & SearchQueryOptions): Observable<Project[]>
  /**
   * Search for documents of a specific Model based on provided conditions
   * @param path name of the search path e.g.) events
   * @param q search query & extra query options
   */
  public search<T extends Schema>(path: string, q: { [key: string]: string | number | boolean }, queryOptions?: QueryOptions & SearchQueryOptions): Observable<T[]> {
    return this.http.post<T[]>(
      `${environment.api_host}/open/search/${path}`, { q: q, options: queryOptions }
    ).pipe(
      catchError(this.handleError<T[]>(`search ${path}`)),
      map((v: T[]) => environment.production && !environment.beta ? v : v ? v : this.demoValues[path])
    );
  }
}

class DemoValues {
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
    const mentors = {
      name: 'Mentors',
      people: []
    }
    for (let i = 1; i <= 5; ++i) {
      mentors.people.push({
        person: {
          _id: objectidExample,
          email: "",
          profile: {
            firstName: "Coding",
            lastName: "Mentor"
          },
          avatar: "assets/square.jpg"
        },
        tagline: "This is a tagline. Person's description will go here."
      })
    }
    return [execs, mentors]
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
        Thank you for taking an interest in Carleton eggX. \
        Our website is currently under development. \
        You will notice a lot of placeholder text around the website. \
        That is because we don't yet have any real data to show. \
        When our sibling website is completed (share.eggx.io), this website will become populated with real information. \
        Thank you for your patience.",
      content: eggxIntro,
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

const eggxIntro = "\
# What is eggX\n\
\n\
eggX is the short-name of Carleton eggX. Well what is that? We're a Carleton University-based club dedicated to the pursuit of proper software and are led by a group of students who've had experience writing and using software.\n\
\n\
## Bootstrapping students into the world of code\n\
\n\
That's our tagline. We know that as Computer Science (or even non-CS) majors, projects are an exceptional way to prove your experience in the field.\n\
\n\
That's why our founders decided to foster an environment where students of all levels can come together to share their love for digital technology.\n\
\n\
We invite you to come along with us on our journey. It doesn't matter what your major is, after all, we're all heavy users of software in one way or another -- whether it be social media or banking or whatever. \
If you're interested in the details of what we're about, checkout our [about page](/about)\n\
"

const execs: Group = {
  name: 'Executives',
  people: [
    {
      title: 'Co-President',
      person: {
        email: '',
        profile: {
          firstName: 'Victor',
          lastName: 'Olaitan'
        },
        avatar: "assets/execs/volaitan.jpg"
      },
      tagline: "\
This is Victor, he's one of our co-presidents. Victor is in his fourth year studying \
computer science in the software engineering stream. Victor loves spending his free time \
writing code and contemplating what the future will look like (he's a real nerd!) But \
he also loves to engage with people of different backgrounds and have lengthy discussions \
on anything under the sun. Victor is experienced in cloud software development and is \
currently working as a DevOps co-op!"
    },
    {
      title: 'Co-President',
      person: {
        email: '',
        profile: {
          firstName: 'Sebastian',
          lastName: 'Gadzinski'
        },
        avatar: "assets/execs/sgadzinski.svg"
      },
      tagline: "\
Sebastian is working in the forest right now and so couldn't submit an intro \
but here's one for him. Sebastian is one of our co-presidents. He's in his fourth year \
of computer science in the software engineering stream with a minor in mathematics. In \
his free time he likes to workout and write Android apps! I'll leave the intro there for \
now and let him introduce himself later."
    },
    {
      title: 'Engagement Officer',
      person: {
        email: '',
        profile: {
          firstName: 'Kartikeyee',
          lastName: 'Gurav'
        },
        avatar: "assets/execs/kgurav.jpg"
      },
      tagline: "\
Kartikeyee (KT) is studying Computer Science and is in his fourth year. \
KT likes to spend his time watching soccer, cooking and enjoying the patio \
season! He likes to get involved in local communities and organisations. \
Kartikeyee is passionate about new developments in the tech industry and \
also enjoys current affairs! (And he doesn't believe pineapple belongs on \
pizza) 😃"
    },
    {
      title: 'Finance Officer',
      person: {
        email: '',
        profile: {
          firstName: 'Sakina',
          lastName: 'Janmohamed'
        },
        avatar: "assets/execs/sjanmohamed.jpg"
      },
      tagline: "\
This is Sakina, she's our finance officer. Sakina is in her third year of \
Commerce with a concentration in Accounting. Sakina is passionate about making \
a positive impact in people's lives. She's also expericed in the art of \
communicatation and problem solving."
    },
    {
      title: 'Marketing Officer',
      person: {
        email: '',
        profile: {
          firstName: 'Shubham',
          lastName: 'Sharan'
        },
        avatar: "assets/execs/ssharan.jpg"
      },
      tagline: "\
This is Shubham Sharan, he's our marketing officer. Shubham is currently \
in his 3rd year of a Bachelor's in Computer Science with a minor in \
statistics. He really enjoys photography and he has over 3 million \
views on Unsplash! Shubham started his journey of design about 3 years ago \
and has worked with magazine publishers, startups & developers to create \
storyboards, products, articles and app designs!"
    },
    {
      title: 'Projects Officer',
      person: {
        email: '',
        profile: {
          firstName: 'Tanner',
          lastName: 'Young'
        },
        avatar: "assets/execs/tyoung.jpg"
      },
      tagline: "\
Tanner is studying international business and is in his 4th year. Tanner \
likes to spend his free time playing video games and loves cooking and learning \
about various culinary cultures. Tanner is interested in progressive and \
ethical change in business. He is experiened in international management & \
finance and recently worked on several research papers/projects notably on \
banking innovation as well as data & AI in business."
    }
  ]
}
