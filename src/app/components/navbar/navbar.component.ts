import {Component, OnChanges, OnInit} from '@angular/core';
import {APICallService} from '../../services/apiCall/apicall.service';
import {LocalStorage} from '@ngx-pwa/local-storage';
import {Router} from '@angular/router';
import {interval} from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  protected isLogged;
  constructor(protected apiCallService: APICallService,
              private router: Router) { }

  ngOnInit() {

    this.checkIfLogged();
  }
  //
  checkIfLogged() {
    this.apiCallService.isLogged().then((value) => {
    console.log('Init ' + value);
    this.isLogged = value;
    });
  }

  async logout() {
    await this.apiCallService.logout();
    this.router.navigate(['/']);
  }
}
