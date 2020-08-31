import { Component, OnInit, Output } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Project } from '../schemas/project';
import { ApiService } from '../api.service';
import { title } from 'process';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  @Output() loading: boolean
  @Output() projects: Project[] = []

  constructor(
    private apiService: ApiService,
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle("Projects @ Carleton eggX")
    this.doSearch();
  }

  onScroll(): void {
    this.doSearch();
  }

  doSearch(): void {
    if (this.loading) return;
    this.loading = true;
    this.apiService.search("projects", {}, {
      limit: 25,
      projection: {
        name: 1,
        domain: 1,
        featuredImage: 1
      },
      populate: [{
        path: 'team', select: 'members'
      }]
    }).subscribe(projects => {
      this.projects.push(...projects);
      this.loading = false;
    })
  }

}
