import { Component, OnInit } from '@angular/core';
import {ProjectService} from '../../services/projectService/project.service';
import {APICallService} from '../../services/apiCall/apicall.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  constructor(protected service: ProjectService,
              protected api: APICallService) { }

  ngOnInit() {
    this.service.init();
  }

  async delete(id) {
    try {
      await this.service.delete(id);
      console.log('deleted');
      await this.service.init();
      console.log('projects refreshed');
    } catch (e) {
      console.log(e);
    }
  }

}
