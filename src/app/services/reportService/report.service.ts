import { Injectable } from '@angular/core';
import {APICallService} from '../apiCall/apicall.service';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private apiCallService: APICallService) { }

  async create(report) {
    const url = 'reports';
    return await this.apiCallService.postWithToken(url, report);
  }
  async get(id) {
    const url = 'reports/' + id;
    return (await this.apiCallService.getWithToken(url)).toPromise();
  }
  async delete(id) {
    const url = 'reports/' + id;
    return (await this.apiCallService.delete(url)).toPromise();
  }
}
