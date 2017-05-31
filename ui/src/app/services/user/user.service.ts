import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { SERVER } from '../../../config';
import { User } from '../../models/user';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {
    private api_endpoint = SERVER.HOST;

    constructor(private http: Http) { }

    getAll (): Observable<any[]> {
        return this.http.get(this.api_endpoint + '/v1/api/frontend/users', this.jwt())
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || { };
    }
    private handleError (error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }

        if (error.status === 401) {
            errMsg = 'Authentication Failure / Token Invalid.. Login again!';
        }
        return Observable.throw(errMsg);
    }

    getById(id: number) {
        return this.http.get('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
    }

    create(user: User) {
        return this.http.post(this.api_endpoint + '/v1/api/frontend/user',
            user, this.headers()).map((response: Response) => response.json());
    }

    update(user: User) {
        return this.http.put('/api/users/' + user.id, user, this.jwt()).map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
    }

    // private helper methods

    private headers() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return new RequestOptions({ headers: headers });
    }

    private jwt() {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        let token = currentUser.token
        if (token) {
            let headers = new Headers({ 'x-access-token': token });
            return new RequestOptions({ headers: headers });
        }
    }
}