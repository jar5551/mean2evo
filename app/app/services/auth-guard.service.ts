import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {CanActivate} from '@angular/router';
import {AuthenticationService} from './authentication.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private authenticationService: AuthenticationService, private router: Router) {
  }

  private handleNotloggedIn() : boolean {
    this.router.navigate(['/admin/login']);
    return false;
  }

  canActivate() {
    return this.authenticationService.loggedIn().map(authState => {
      if (!authState)
        this.handleNotloggedIn();
      console.log('activate?', !!authState);
      return !!authState;
    }).take(1);

    /*return this.authenticationService.loggedIn()
      .map(res => {
        console.log(res);
        return true;
      });*/
  }

  canActivateOld() {
    if (this.authenticationService.loggedIn()) {
      return true;
    } else {
      return this.handleNotloggedIn();
    }
  }

  /* canActivate() {
   if (localStorage.getItem('currentUser')) {
   // logged in so return true
   return true;
   }

   // not logged in so redirect to login page
   this.router.navigate(['/login']);
   return false;
   }*/


}
