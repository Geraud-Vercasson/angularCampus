import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {APICallService} from '../../services/apiCall/apicall.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private apiCallService: APICallService) { }

  ngOnInit() {
  }

  async onSubmit(form: NgForm) {
    console.log(form.value);
    try {
      const response = this.apiCallService.createUser(form.value['email'],
        form.value['password']);
      console.log( (await response)['token']);
    } catch (exception) {
      alert(exception.error.message);
    }
  }

}
