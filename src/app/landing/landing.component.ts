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
  @Output() posts: Post[] = []

  constructor(
    private apiService: ApiService,
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle("This is Carleton eggX");
    this.doSearch();
  }

  onScroll(): void {
    this.doSearch();
  }

  doSearch(): void {
    if (this.loading) return;
    this.apiService.search("posts", {}, {
      limit: 5,
      projection: {
        title: 1,
        blurb: 1,
        callToAction: 1,
        featuredImage: 1
      }
    }).subscribe(posts => {
      this.posts.push(...posts);
      this.loading = false;
    })
  }

}
