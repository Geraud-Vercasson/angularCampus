import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {LocalStorage} from '@ngx-pwa/local-storage';


@Injectable({
  providedIn: 'root'
})
export class APICallService {
  static TOKEN_KEY = 'token';
  static endPointUrl = 'https://daily-standup-campus.herokuapp.com/api/';

  private httpOptions: {
    headers?: HttpHeaders
  } = {};
  constructor(private httpClient: HttpClient,
              protected localStorage: LocalStorage) {}

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
  async makeTokenAuthHeader() {
    const token = await this.localStorage.getItem('token').toPromise();
    this.httpOptions.headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
    });
  }

  createUser(email: string, pass: string) {
    this.makeCreateUserHeader();
    const url = APICallService.endPointUrl + 'users';
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
    this.makeBasicAuthHeader(email, pass);
    const url = APICallService.endPointUrl + 'auth';
    return this.post(url).toPromise();
  }

  async logout() {
    await this.localStorage.clear().toPromise();
    console.log('cleared');
    this.httpOptions = {};
  }

  async postWithToken(urlWithoutEndpoint: string, params?: Object): Promise<any> {
    const url = APICallService.endPointUrl + urlWithoutEndpoint;
    await this.makeTokenAuthHeader();
    return this.post(url, params);
  }

  async getWithToken(urlWithoutEndpoint: string): Promise<any> {
    try {
      const url = APICallService.endPointUrl + urlWithoutEndpoint;
      await this.makeTokenAuthHeader();
      return this.httpClient.get(url, this.httpOptions);
    } catch (e) {
      console.log(e);
    }
  }

  async isLogged() {
    const token = await this.localStorage.getItem('token').toPromise();
    return token !== null;
  }

  async delete(urlWithoutEndPoint) {
    try {
      const url = APICallService.endPointUrl + urlWithoutEndPoint;
      await this.makeTokenAuthHeader();
      return this.httpClient.delete(url, this.httpOptions);
    } catch (e) {
      console.log(e);
    }
  }
}
