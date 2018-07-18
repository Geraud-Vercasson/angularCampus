import { Injectable } from '@angular/core';
import {APICallService} from '../apiCall/apicall.service';
import {Project} from '../../components/projects/class/project';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  projects: Project[] = [];
  constructor(private apiCallService: APICallService) {
  }

  async getProjects(): Promise<Observable<Project[]>> {
    return (await this.apiCallService.getWithToken('projects'));
  }

  async init() {
    const obs = await this.getProjects();
    this.projects = await obs.toPromise();
  }

  async create(project) {
    const url = '/projects';
    return await this.apiCallService.postWithToken(url, project);
  }

  async getProject(id: string): Promise<Project> {
    const url = 'projects/' + id;
    const response = await this.apiCallService.getWithToken(url);
    return await response.toPromise();
  }

  async delete(id): Promise<any> {
    const url = 'projects/' + id;
    const response = await this.apiCallService.delete(url);
    return await response.toPromise();

  }
}
