import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
 
@Injectable()
export class AlertService {
    subject = new BehaviorSubject<Object>(false);
    private keepAfterNavigationChange = false;
 
    constructor(private router: Router) {
        // clear alert message on route change
        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                console.log(this.keepAfterNavigationChange);
                if (this.keepAfterNavigationChange) {
                    // only keep for a single location change
                    this.keepAfterNavigationChange = false;
                } else {
                    // clear alert
                    console.log('clear res');
                    this.subject.next('');
                }
            }
        });
    }
 
    success(message: string, keepAfterNavigationChange = false) {
        console.log(message, keepAfterNavigationChange);
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subject.next({ type: 'success', text: message });
    }
 
    error(message: string, keepAfterNavigationChange = false) {
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subject.next({ type: 'error', text: message });
    }
 
    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
}