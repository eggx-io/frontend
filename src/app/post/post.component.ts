import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Post } from '../schemas/post';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Output() post: Post
  @Output() loading: boolean

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['_id']) {
        this.doFetch(params['_id']);
      } else {
        this.router.navigateByUrl('/404')
      }
    });
  }

  doFetch(postId): void {
    if (this.loading) return;
    this.loading = true;
    this.apiService.fetch('post', postId, {
      populate: {
        path: 'author'
      },
      projection: {
        author: 1,
        title: 1,
        content: 1,
        featuredImage: 1,
        tags: 1,
        'log.createdDate': 1
      }
    }).subscribe(post => {
      this.post = post;
      this.titleService.setTitle(`${post.title} | Carleton eggX`);
      this.loading = false;
    })
  }
}
