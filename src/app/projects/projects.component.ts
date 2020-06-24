import { Component, OnInit, Output } from '@angular/core';
import { Project } from '../schemas/project';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  @Output() projects$: Observable<Project[]>

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.projects$ = this.apiService.search("projects", {}, {
      limit: 25,
      projection: {
        name: 1,
        domain: 1,
        featuredImage: 1
      },
      populate: {
        path: 'team', select: 'members'
      }
    })
  }

}
