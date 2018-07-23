import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {ReportService} from '../../../services/reportService/report.service';

@Component({
  selector: 'app-create-report',
  templateUrl: './create-report.component.html',
  styleUrls: ['./create-report.component.css']
})
export class CreateReportComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private reportService: ReportService,
              private router: Router) { }
  private projectId: string;
  ngOnInit() {
    this.projectId = this.route.snapshot.paramMap.get('id');
  }
  async onSubmit(form: NgForm) {
    const report = {
      project: this.projectId,
      content: form.value['content'],
      rate: form.value['rate'],
      date: form.value['date']
    };
    const response = (await this.reportService.create(report)).toPromise();
    await response;
    this.router.navigate(['/project/' + this.projectId]);
  }
}
