import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {ProjectService} from '../../../services/projectService/project.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {

  constructor(private projectService: ProjectService,
              private router: Router) { }

  ngOnInit() {
  }

  async onSubmit(form: NgForm) {
    const params = {
      name: form.value['name'],
      description: form.value['description']
    };
    const response = await this.projectService.create(params);
    response.subscribe(() => this.router.navigate(['/']));

  }

}
