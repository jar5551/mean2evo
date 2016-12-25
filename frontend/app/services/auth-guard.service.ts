import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {CanActivate} from '@angular/router';
import {AuthenticationService} from './authentication.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private authenticationService: AuthenticationService, private router: Router) {
  }

  canActivate() {
    if(this.authenticationService.loggedIn()) {
      return true;
    } else {
      this.router.navigate(['/admin/signin']);
      return false;
    }
  }

}
