import { Injectable } from '@angular/core';
import { LoginInfo } from './loginInterface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
/*
  Generated class for the LoginProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginProvider {

  loginInfo: LoginInfo;

  constructor(private http: HttpClient) {

  }


  doLogin(userName: String, password: String): Boolean {
    if (userName && password) {
      if (userName == "dsd08" && password == "12345") {
        return true;
      } else {
        return false;
      }
    }
    return false;
  }
}
