import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { SERVER } from "../../../config";
import { Observable } from 'rxjs';

@Injectable()
export class SessionService {
  private api_endpoint = SERVER.HOST;
  private loggedIn = false;
  public status: EventEmitter<boolean>;

  constructor(private http: Http) {
    this.loggedIn = localStorage.getItem('currentUser')? true :false;
    this.status = new EventEmitter<boolean>();
  }

  login(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http
      .post(this.api_endpoint + '/v1/api/frontend/authenticate',user,{ headers})
      .map(res => res.json())
      .map((res) => {
        if (res.success) {
          console.log(res.token);
          localStorage.setItem('currentUser', JSON.stringify({ username: user.email, token: res.token }));
          this.loggedIn = true;
          this.status.emit(this.loggedIn);
        }
        return res.success;
      })
      .catch(this.handleError);
  }

  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      console.log(body);
      errMsg = body.message || `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    if (error.status == 401) {
      errMsg = "Authentication Failure / Token Invalid.. Login again!";
    }
    return Observable.throw(errMsg);
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.loggedIn = false;
    this.status.emit(this.loggedIn);
  }

  isLoggedIn() {
    return this.loggedIn;
  }

}