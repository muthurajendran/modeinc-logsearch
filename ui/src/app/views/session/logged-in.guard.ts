import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SessionService } from './session.service';

@Injectable()
export class LoggedInGuard implements CanActivate {
  constructor(private session: SessionService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.session.isLoggedIn())
      return true;

    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }
}