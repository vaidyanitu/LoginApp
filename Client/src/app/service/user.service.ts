import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { User } from '../model/user';
import { AppConfig } from '../app.config';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  constructor(private http: Http, private config: AppConfig) { }

  getAll() {
    return this.http.get(this.config.apiUrl + '/users', this.jwt()).map((response: Response) => response.json());
  }

  getById(_id: number) {
    return this.http.get(this.config.apiUrl + '/users/' + _id, this.jwt()).map((response: Response) => response.json());
  }

  getPasswordByUserName(username: string) {
    return this.http.get(this.config.apiUrl + '/users/GetUser?username=' + username, this.jwt()).map((response: Response) => {
      response.json();
      //console.log(response.json());
    });
  }

  create(user: User) {
    return this.http.post(this.config.apiUrl + '/users', user, this.jwt()).map((response: Response) => response.json());
  }

  update(user: User) {
    return this.http.put(this.config.apiUrl + '/users/' + user._id, this.jwt());
  }

  delete(_id: number) {
    return this.http.delete(this.config.apiUrl + '/users/' + _id, this.jwt());
  }

  forgotPassword(email: string) {
    debugger;
    var body = {};
    var url = this.config.apiUrl + '/users/forgotPassword/' + email;
    return this.http.post(url, body);
  }

  resetPassword(pwd: string, rpwd: string, resetid: string, rtoken: string) {
    debugger;
    var body = ({ password: pwd, repassword: rpwd, id: resetid, token: rtoken });
    //var search = new URLSearchParams();
    //search.append('id', resetid);
    //search.append('password', pwd);
    //search.append('repassword', rpwd);
    //search.append('token', rtoken);
    return this.http.post(this.config.apiUrl + '/users/resetPassword', body)
      .map((response: Response)=>response.json());
  }

  private jwt() {
    //create authorization header with jwt token
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
      return new RequestOptions({ headers: headers });
    }
  }

}
