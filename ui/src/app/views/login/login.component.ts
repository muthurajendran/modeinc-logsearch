import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core';
import { SessionService } from '../session/session.service';
import { AlertService } from '../../components/alert/alert.service';

@Component({
    selector: 'login',
    templateUrl: 'login.template.html'
})
export class loginComponent { 
  model: any = {};
  loading = false;
  returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sessionService: SessionService,
    private alertService: AlertService) { }

  ngOnInit() {
    // reset login status
    this.sessionService.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    this.loading = true;
    this.sessionService.login(this.model)
      .subscribe(
        data => {
            this.alertService.success('Logged In Successfully', true);
            this.router.navigate([this.returnUrl]);
        },
        error => {
            this.alertService.error(error);
            this.loading = false;
        });
    }
}