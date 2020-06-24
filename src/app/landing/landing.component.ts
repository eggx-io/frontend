import { Component, OnInit, Output } from '@angular/core';
import { Post } from '../schemas/post';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  @Output() spotlightPost$: Observable<Post[]>
  @Output() posts$: Observable<Post[]>

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.spotlightPost$ = this.apiService.search("posts", { spotlight: true }, {
      limit: 1,
      projection: {
        title: 1,
        blurb: 1,
        callToAction: 1,
        featuredImage: 1
      }
    })
    this.posts$ = this.apiService.search("posts", {}, {
      limit: 5,
      projection: {
        title: 1,
        blurb: 1,
        callToAction: 1,
        featuredImage: 1
      }
    })
  }

}
