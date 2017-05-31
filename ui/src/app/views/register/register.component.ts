import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core';
import { SessionService } from '../session/session.service';
import { AlertService } from '../../components/alert/alert.service';
import { UserService } from '../../services/user/user.service';

@Component({
    selector: 'app-register',
    templateUrl: 'register.template.html',
    providers: [UserService, SessionService]
})

export class RegisterComponent implements OnInit {
    model: any = {};
    loading = false;
    accesscode: any;

    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService,
        private sessionService: SessionService) { }

    ngOnInit(): void {
        if (this.sessionService.isLoggedIn()) {
            this.alertService.error('Logout to register', true);
            this.router.navigate(['/']);
        }
    }

    checkAcess() {
        if (this.model.accessCode === 'pinguin123!@#') {
            return true;
        }
        return false;
    }

    register() {
        if (this.checkAcess()) {
            this.loading = true;
            this.userService.create(this.model)
                .subscribe(
                    data => {
                        this.alertService.success('Registration successful', true);
                        this.router.navigate(['/login']);
                    },
                    error => {
                        console.log(JSON.parse(error._body).message.message);
                        this.alertService.error(JSON.parse(error._body).message.message);
                        this.loading = false;
                    });
        } else {
            this.alertService.error('Access code invalid');
        }
    }

}