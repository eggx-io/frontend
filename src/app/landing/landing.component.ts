import { Component, OnInit, Output } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Post } from '../schemas/post';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  @Output() loading: boolean
  @Output() spotlightPost: Post
  @Output() posts: Post[] = []

  constructor(
    private apiService: ApiService,
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle("Carleton eggX");
    if (this.loading) return;
    this.loading = true;
    const tracker = {
      doneSpotlightPost: false,
      doneInitialPosts: false
    };
    this.apiService.search("posts", { spotlight: true }, {
      limit: 1,
      projection: {
        title: 1,
        blurb: 1,
        callToAction: 1,
        featuredImage: 1
      }
    }).subscribe(([spotlightPost]) => {
      console.log(spotlightPost)
      this.spotlightPost = spotlightPost
      if (tracker.doneInitialPosts) {
        this.loading = false;
      } else {
        tracker.doneSpotlightPost = true;
      }
    })
    this.doSearch(tracker);
  }

  onScroll(): void {
    this.doSearch();
  }

  doSearch(tracker = undefined): void {
    if (this.loading && !tracker) return;
    if (!tracker) this.loading = true;
    this.apiService.search("posts", {}, {
      limit: 5,
      projection: {
        title: 1,
        blurb: 1,
        callToAction: 1,
        featuredImage: 1
      }
    }).subscribe(posts => {
      console.log(posts)
      this.posts.push(...posts);
      if (tracker) {
        if (tracker.doneSpotlightPost) {
          this.loading = false;
        } else {
          tracker.doneInitialPosts = true;
        }
      } else {
        this.loading = false;
      }
    })
  }

}
