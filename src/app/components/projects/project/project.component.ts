import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProjectService} from '../../../services/projectService/project.service';
import {Project} from '../class/project';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  project = new Project();

  constructor(private route: ActivatedRoute,
              private service: ProjectService) { }

  ngOnInit() {
    this.project.creator = {id: '',
    name: '',
    picture: '',
    role: ''};
    this.getProject();
  }

  async getProject() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('id ' + id);
    this.project = await this.service.getProject(id);
    console.log(this.project);
  }
}
