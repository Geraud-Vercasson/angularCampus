import { Component, OnInit } from '@angular/core';
import {APICallService} from '../../services/apiCall/apicall.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(protected apiCallService: APICallService) { }

  ngOnInit() {
  }

}
