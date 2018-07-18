import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {APICallService} from '../../services/apiCall/apicall.service';
import {LocalStorage} from '@ngx-pwa/local-storage';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private apiCallService: APICallService,
              protected localStorage: LocalStorage,
              private router: Router) { }

  ngOnInit() {
    this.apiCallService.isLogged().then( value => {
      if (value) {
      this.router.navigate(['/projects']);
      }
    });
  }
  async onSubmit(form: NgForm) {
    try {
      const response = this.apiCallService.login(form.value['email'],
                                   form.value['password']);
      const token = (await response)['token'];
      await this.localStorage.setItem('token', token).toPromise();

      window.location.replace('/projects');

    } catch (exception) {
      alert(exception.error.message);
    }
  }

}
