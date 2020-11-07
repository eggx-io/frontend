import { Component, OnInit, Output } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Group } from '../schemas/group'
import { ApiService } from '../api.service';
import { Person } from '../schemas/person';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {
  @Output() loading: boolean
  @Output() selectedGroup: string = "executives"
  @Output() groups: Group[] = []
  @Output() people: Group["people"] = []

  constructor(
    private apiService: ApiService,
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle("People @ Carleton eggX");
    this.doSearch();
    // this.doSetup()
  }

  doSearch(): void {
    if (this.loading) return;
    this.loading = true;
    this.apiService.search('groups', {}, {
      projection: {
        name: 1,
        people: 1
      },
      populate: [{
        path: 'people.person',
        select: 'avatar profile.firstName profile.lastName'
      }]
    }).subscribe(groups => {
      this.groups.splice(0, this.groups.length, ...groups);
      if (this.groups) {
        const selectedGroup = this.groups.find(g => g.name.toLowerCase() == this.selectedGroup) || this.groups[0];
        selectedGroup.people = selectedGroup.people.sort((p1, p2) => p1.title.localeCompare(p2.title))
        this.people.splice(
          0,
          this.people.length,
          ...selectedGroup.people
        );
        this.titleService.setTitle(`${selectedGroup.name} @ Carleton eggX`)
      }
      this.loading = false;
    })
  }

  switchGroup(group: string): void {
    if (this.selectedGroup == group) return;
    this.selectedGroup = group.toLowerCase();
    const selectedGroup = this.groups.find(g => g.name.toLowerCase() == this.selectedGroup) || this.groups[0];
    this.people.splice(
      0,
      this.people.length,
      ...selectedGroup.people
    );
    this.titleService.setTitle(`${selectedGroup.name} @ Carleton eggX`);
  }

  doSetup() {
    let execs: Group['people'][0][] = []
    let mentors: Group['people'][0][] = []
    const onPeopleUpdated = () => {
      this.apiService.update<Group>('group', { name: 'Executives' }, {
        name: 'Executives',
        people: execs
      }, { upsert: true }).subscribe()
      this.apiService.update<Group>('group', { name: 'Mentors' }, {
        name: 'Mentors',
        people: mentors
      }, { upsert: true }).subscribe()
    }
    const mutatedPush = (array: Group['people'][0][], item: Group['people'][0]) => {
      array.push(item)
      if (execs.length == 5 && mentors.length == 4) onPeopleUpdated()
    }
    this.apiService.findOneAndUpdate<Person>('person', { email: 'victorolaitan@cmail.carleton.ca' }, {
      email: 'victorolaitan@cmail.carleton.ca', email_verified: true,
      avatar: 'https://eggx.io/assets/execs/volaitan.jpg',
      profile: {
        firstName: 'Victor',
        lastName: 'Olaitan'
      },
      log: {
        joinedDate: new Date(2019, 8, 1).getTime()
      }
    }, { upsert: true }).subscribe(person => mutatedPush(execs, {
      title: 'President',
      person: person._id,
      tagline: "\
Victor is in his fourth year studying computer science in the software engineering \
stream. Victor loves spending his free time writing code and contemplating what \
the future will look like (he's a real nerd!) But he also loves to engage with \
people of different backgrounds and have lengthy discussions on anything under the \
sun. Victor is experienced in cloud software development and is currently working \
as a DevOps co-op!"
    }))
    this.apiService.findOneAndUpdate<Person>('person', { email: 'kartikeyeegurav@cmail.carleton.ca' }, {
      email: 'kartikeyeegurav@cmail.carleton.ca', email_verified: true,
      avatar: 'https://eggx.io/assets/execs/kgurav.jpg',
      profile: {
        firstName: 'Kartikeyee',
        lastName: 'Gurav'
      },
      log: {
        joinedDate: new Date(2020, 6, 21).getTime()
      }
    }, { upsert: true }).subscribe(person => mutatedPush(execs, {
      title: 'Engagement Officer',
      person: person._id,
      tagline: "\
Kartikeyee (KT) is studying Computer Science and is in his fourth year. \
KT likes to spend his time watching soccer, cooking and enjoying the patio \
season! He likes to get involved in local communities and organisations. \
Kartikeyee is passionate about new developments in the tech industry and \
also enjoys current affairs! (And he doesn't believe pineapple belongs on \
pizza) 😃"
    }))
    this.apiService.findOneAndUpdate<Person>('person', { email: 'sakinajanmohamed@cmail.carleton.ca' }, {
      email: 'sakinajanmohamed@cmail.carleton.ca', email_verified: true,
      avatar: 'https://eggx.io/assets/execs/sjanmohamed.jpg',
      profile: {
        firstName: 'Sakina',
        lastName: 'Janmohamed'
      },
      log: {
        joinedDate: new Date(2020, 6, 21).getTime()
      }
    }, { upsert: true }).subscribe(person => mutatedPush(execs, {
      title: 'Finance Officer',
      person: person._id,
      tagline: "\
This is Sakina, she's our finance officer. Sakina is in her third year of \
Commerce with a concentration in Accounting. Sakina is passionate about making \
a positive impact in people's lives. She's also expericed in the art of \
communicatation and problem solving."
    }))
    this.apiService.findOneAndUpdate<Person>('person', { email: 'shubhamsharan@cmail.carleton.ca' }, {
      email: 'shubhamsharan@cmail.carleton.ca', email_verified: true,
      avatar: 'https://eggx.io/assets/execs/ssharan.jpg',
      profile: {
        firstName: 'Shubham',
        lastName: 'Sharan'
      },
      log: {
        joinedDate: new Date(2020, 6, 21).getTime()
      }
    }, { upsert: true }).subscribe(person => mutatedPush(execs, {
      title: 'Marketing Officer',
      person: person._id,
      tagline: "\
      This is Shubham Sharan, he's our marketing officer. Shubham is currently \
      in his 3rd year of a Bachelor's in Computer Science with a minor in \
      statistics. He really enjoys photography and he has over 3 million \
      views on Unsplash! Shubham started his journey of design about 3 years ago \
      and has worked with magazine publishers, startups & developers to create \
      storyboards, products, articles and app designs!"
    }))
    this.apiService.findOneAndUpdate<Person>('person', { email: 'tanneryoung@cmail.carleton.ca' }, {
      email: 'tanneryoung@cmail.carleton.ca', email_verified: true,
      avatar: 'https://eggx.io/assets/execs/tyoung.jpg',
      profile: {
        firstName: 'Tanner',
        lastName: 'Young'
      },
      log: {
        joinedDate: new Date(2020, 6, 21).getTime()
      }
    }, { upsert: true }).subscribe(person => mutatedPush(execs, {
      title: 'Projects Officer',
      person: person._id,
      tagline: "\
Tanner is studying international business and is in his 4th year. Tanner \
likes to spend his free time playing video games and loves cooking and learning \
about various culinary cultures. Tanner is interested in progressive and \
ethical change in business. He is experiened in international management & \
finance and recently worked on several research papers/projects notably on \
banking innovation as well as data & AI in business."
    }))
    this.apiService.findOneAndUpdate<Person>('person', { email: 'ryanshimoga@cmail.carleton.ca' }, {
      email: 'ryanshimoga@cmail.carleton.ca', email_verified: true,
      avatar: 'https://eggx.io/assets/execs/rshimoga.jpg',
      profile: {
        firstName: 'Ryan',
        lastName: 'Shimoga'
      },
      log: {
        joinedDate: new Date(2020, 6, 21).getTime()
      }
    }, { upsert: true }).subscribe(person => mutatedPush(mentors, {
      title: 'Lead Mentor',
      person: person._id,
      tagline: "\
This is Ryan Shimoga, he is one of our mentors and is in his 4th year of \
Computer Science. Ryan currently works for the Burlington Chamber of \
Commerce and has 10+ years of experience in the field of customer service & \
sales. He is an advocate for youth empowerment and is often described as very \
approachable and hard-working. Ryan also enjoys soccer, and has played \
competitively for 14 years."
    }))
    this.apiService.findOneAndUpdate<Person>('person', { email: 'harleenpabla@cmail.carleton.ca' }, {
      email: 'harleenpabla@cmail.carleton.ca', email_verified: true,
      avatar: 'https://eggx.io/assets/execs/hpabla.jpg',
      profile: {
        firstName: 'Harleen',
        lastName: 'Pabla'
      },
      log: {
        joinedDate: new Date(2020, 7, 22).getTime()
      }
    }, { upsert: true }).subscribe(person => mutatedPush(mentors, {
      title: 'Mentor - Web & App Design',
      person: person._id,
      tagline: "\
This is Harleen, she’s one of our mentors. Harleen is studying Computer Science \
and is in her 4th year. Harleen likes to spend her time hiking, photographing \
the outdoors, and cooking. She's also passionate about the interplay of biology \
and technology. As well, she loves learning about the new advances in mobility \
aids and assistive technology. Harleen is experienced & currently working in the \
field of front-end and program architecture."
    }))
    this.apiService.findOneAndUpdate<Person>('person', { email: 'benwallace@cmail.carleton.ca' }, {
      email: 'benwallace@cmail.carleton.ca', email_verified: true,
      avatar: 'https://eggx.io/assets/execs/bwallace.jpg',
      profile: {
        firstName: 'Ben',
        lastName: 'Wallace'
      },
      log: {
        joinedDate: new Date(2020, 8, 15).getTime()
      }
    }, { upsert: true }).subscribe(person => mutatedPush(mentors, {
      title: 'Mentor - DevOps',
      person: person._id,
      tagline: "\
Ben is in Computer Science Software Engineering Stream and is in his 3rd year. \
In Ben’s spare time, he enjoys playing hockey, skiing, and working out. Ben \
has worked in DevOps and Web Development, and will be working as a Back End \
Developer in the summer."
    }))
    this.apiService.findOneAndUpdate<Person>('person', { email: 'victoryang@cmail.carleton.ca' }, {
      email: 'victoryang@cmail.carleton.ca', email_verified: true,
      avatar: 'https://eggx.io/assets/execs/vyang.jpg',
      profile: {
        firstName: 'Victor',
        lastName: 'Yang'
      },
      log: {
        joinedDate: new Date(2020, 8, 16).getTime()
      }
    }, { upsert: true }).subscribe(person => mutatedPush(mentors, {
      title: 'Mentor - Mobile Apps',
      person: person._id,
      tagline: "\
Victor is in his 3rd year of a Bachelor's of Computer Science in the Mobile \
Applications stream. Victor enjoys problem solving and learning new languages \
and technologies. Victor's interests range from travelling to being active, \
or just coding for fun. He also likes video games, likes to meet new people \
and is looking forward to helping out as a mentor."
    }))
  }
}
