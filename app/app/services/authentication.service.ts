import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {tokenNotExpired, AuthHttp, JwtHelper} from 'angular2-jwt';

@Injectable()
export class AuthenticationService {
  public token: string;
  refreshSubscription: any;

  constructor(private http: Http, private authHttp: AuthHttp, private jwtHelper: JwtHelper) {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
  }

  public login(email: string, password: string) {
    return this.http.post('/api/auth/signin', {email: email, password: password})
      .map(res => {
        let token = res.json().token;
        let refreshToken = res.json().refresh;

        if (token) {
          this.token = token;

          localStorage.setItem('id_token', token);
          localStorage.setItem('refresh_token', refreshToken);

          return true;
        } else {
          return false;
        }
        //res.json()
      });
  }

  public logout() {

    return this.authHttp.get('/api/auth/logout')
      .map(res => {

        this.unscheduleRefresh();
        this.token = null;
        localStorage.removeItem('id_token');

          return res;
        });
  }

  public loggedIn() {
    return tokenNotExpired();
  }

  public scheduleRefresh() {
    let source = this.authHttp.tokenStream.flatMap(
      token => {

        // The delay to generate in this case is the difference
        // between the expiry time and the issued at time
        let jwtIat = this.jwtHelper.decodeToken(token).iat;
        let jwtExp = this.jwtHelper.decodeToken(token).exp;
        let iat = new Date(0);
        let exp = new Date(0);

        let delay = (exp.setUTCSeconds(jwtExp) - iat.setUTCSeconds(jwtIat));

        return Observable.interval(delay);
      });

    this.refreshSubscription = source.subscribe(() => {
      this.getNewJwt();
    });
  }

  public startupTokenRefresh() {
    // If the user is authenticated, use the token stream
    // provided by angular2-jwt and flatMap the token

    if (this.loggedIn()) {
      let source = this.authHttp.tokenStream.flatMap(
        token => {
          // Get the expiry time to generate
          // a delay in milliseconds
          let now: number = new Date().valueOf();
          let jwtExp: number = this.jwtHelper.decodeToken(token).exp;
          let exp: Date = new Date(0);
          exp.setUTCSeconds(jwtExp);
          let delay: number = exp.valueOf() - now;

          // Use the delay in a timer to
          // run the refresh at the proper time
          return Observable.timer(delay);
        });

      // Once the delay time from above is
      // reached, get a new JWT and schedule
      // additional refreshes
      source.subscribe(() => {
        this.getNewJwt();
        this.scheduleRefresh();
      });
    }
  }

  public unscheduleRefresh() {
    // Unsubscribe fromt the refresh
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }

  public getNewJwt() {
    // Get a new JWT from Auth0 using the refresh token saved
    // in local storage

    console.log('getNewJwt');

    this.http.post('/api/auth/refresh', {token: localStorage.getItem('refresh_token')})
      .map(res => {
        console.log('/api/auth/refresh', res);
      });

    /*this.local.get('refresh_token').then(token => {
      this.lock.getClient().refreshToken(token, (err, delegationRequest) => {
        if (err) {
          alert(err);
        }
        this.local.set('id_token', delegationRequest.id_token);
      });
    }).catch(error => {
      console.log(error);
    });*/
  }
}
