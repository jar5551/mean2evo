import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AuthenticationService} from './../services/authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {
  /*canActivate(next: ActivatedRouteSnapshot,
   state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
   return true;
   }*/

  constructor(private authenticationService: AuthenticationService, private router: Router) {
  }

  private handleNotloggedIn(): boolean {
    this.authenticationService.removeTokens();
    this.router.navigate(['/login']);
    return false;
  }

  canActivate() {
    return this.authenticationService.loggedIn()
      .map(authState => {
        if (!authState)
          this.handleNotloggedIn();
        return !!authState;
      })
      .take(1);
  }
}
