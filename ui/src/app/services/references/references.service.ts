import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { SERVER } from '../../../config';
import { Reference } from '../../models/reference';
import { Candidate } from '../../models/candidate';

@Injectable()
export class ReferencesService {

    private api_endpoint = SERVER.HOST;

    constructor(private http: Http) {}

    /*
     Handling data methods
     */
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

    /*
     Helper methods for signing api
     */

    private jwt() {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));

        let token = currentUser.token;
        let username = currentUser.username;
        if (token) {
            let headers = new Headers({ 'x-access-token': token, 'x-access-username': username });
            return new RequestOptions({ headers: headers });
        }
    }

    search (model): Observable<any[]> {
        let query = ''
        query += 'start=' + model.search_date + 'T' + model.search_time + 'Z'
        query += '&limit=' + model.limit;
        query += '&page=' + model.page;
        return this.http.get('http://localhost:5000/search?' + query)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /*
     Api to get all channels
     */
    getAll (): Observable<any[]> {
        return this.http.get(this.api_endpoint + '/v2/api/references/frontend', this.jwt())
            .map(this.extractData)
            .catch(this.handleError);
    }
    /*
     Api to get channel by Id
     */
    getByUsername(): Observable<any[]> {
        let url = this.api_endpoint + '/v2/api/candidate/frontend/email';
        return this.http.get( url, this.jwt())
            .map(this.extractData)
            .catch(this.handleError);
    }

    /*
     send sms to user
     */
    sendSMS(phone: String): Observable<any[]> {
        let endpoint = this.api_endpoint + '/v2/api/candidate/frontend/sendsms';
        return this.http.post(endpoint, {phone: phone}, this.jwt())
            .map(this.extractData)
            .catch(this.handleError);
    }

    /*
     send sms to user
     */
    verifyCode(code: String): Observable<any[]> {
        let endpoint = this.api_endpoint + '/v2/api/candidate/frontend/verifycode';
        return this.http.post(endpoint, {verifyCode: code}, this.jwt())
            .map(this.extractData)
            .catch(this.handleError);
    }

    /*
     send sms to user
     */
    createReference(reference: Reference): Observable<any[]> {
        let endpoint = this.api_endpoint + '/v2/api/candidate/frontend/reference/create';
        return this.http.post(endpoint, reference, this.jwt())
            .map(this.extractData)
            .catch(this.handleError);
    }

}
