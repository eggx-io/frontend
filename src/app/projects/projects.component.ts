import { Component, OnInit, Output } from '@angular/core';
import { Project } from '../schemas/project';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  @Output() loading: boolean
  @Output() projects: Project[] = []

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
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
      populate: {
        path: 'team', select: 'members'
      }
    }).subscribe(projects => {
      this.projects.push(...projects);
      this.loading = false;
    })
  }

}
