import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LocalStorage} from '@ngx-pwa/local-storage';

@Injectable({
  providedIn: 'root'
})
export class APICallService {
  private httpOptions: {
    headers?: HttpHeaders
  } = {};
  private endPointUrl = 'https://daily-standup-campus.herokuapp.com/api/';

  constructor(private httpClient: HttpClient,
              protected localStorage: LocalStorage) { }

  makeCreateUserHeader() {
    this.httpOptions.headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }

  makeBasicAuthHeader(email: string, pass: string) {
    const encodedString = btoa(email + ':' + pass);
    this.httpOptions.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + encodedString
    });
  }
  makeTokenAuthHeader(token: string) {
    this.httpOptions.headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
    });
  }

  createUser(email: string, pass: string) {
    this.makeCreateUserHeader();
    const url = this.endPointUrl + 'users';
    const params = {
      email: email,
      password: pass,
      access_token: 'masterKey'
    };

    return this.post(url, params).toPromise();
  }

  post(url: string, params?: Object): Observable<Object> {
    if (!params) {
      params = {};
    }
    return this.httpClient.post(url, params, this.httpOptions);
  }

  login(email: string, pass: string) {
    console.log('yo');
    this.makeBasicAuthHeader(email, pass);
    const url = this.endPointUrl + 'auth';
    return this.post(url).toPromise();
  }

  async isLogged(): Promise<boolean> {
    const token = await this.localStorage.getItem('token').toPromise();
    return token !== null;
  }

  logout() {

  }


}
