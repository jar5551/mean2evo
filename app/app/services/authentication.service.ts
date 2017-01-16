import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {tokenNotExpired, JwtHelper} from 'angular2-jwt';
import {AuthHttp} from './auth-http.service';

import {ReplaySubject} from 'rxjs';
import {Router} from '@angular/router';

@Injectable()
export class AuthenticationService {
  public token: string;
  public refreshToken: string;
  refreshSubscription: any;

  constructor(private http: Http, private authHttp: AuthHttp, private jwtHelper: JwtHelper, private router: Router) {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
  }

  public login(email: string, password: string) {
    return this.http.post('/api/auth/signin', {email: email, password: password})
      .map(res => {
        let token = res.json().token;
        let refreshToken = res.json().refresh;

        if (token && refreshToken) {
          this.setTokens(token, refreshToken);
          return true;
        }

        return false;
        //res.json()
      });
  }

  public getMe() {
    return this.authHttp.get('/api/auth/me')
      .map(res => {
        return res.json();
      })
  }

  public logout() {
    console.log('logout');

    return this.authHttp.get('/api/auth/logout')
      .map(res => {
        this.removeTokens();
        return res;
      });
  }

  public removeTokens() {
    this.token = null;
    this.refreshToken = null;
    localStorage.removeItem('id_token');
    localStorage.removeItem('refresh_token');
    this.unscheduleRefresh();
  }

  private isStoredTokens() {
    return localStorage.getItem('id_token') && localStorage.getItem('refresh_token');
  }

  public loggedIn(): Observable<boolean> {
    let resultSubject = new ReplaySubject(1);

    //console.log('loggedIn?', localStorage.getItem('id_token'), !tokenNotExpired());

    if (!tokenNotExpired() && tokenNotExpired(null, localStorage.getItem('refresh_token'))) {
      this.getNewJwt()
        .subscribe(
          res => {
            if (!res || !res.token || !res.refresh) {
              return this.logout()
                .subscribe();
            }

            resultSubject.next(tokenNotExpired());
          },
          err => {
            console.log('err', err);
            this.removeTokens();
            this.router.navigate(['/admin/login']);
          });

    } else {
      resultSubject.next(tokenNotExpired());
    }

    return resultSubject;

    //return this.http.post('/api/auth/refresh', {token: localStorage.getItem('refresh_token')});
    //return tokenNotExpired();

    /*if(!tokenNotExpired())
     return tokenNotExpired(null, localStorage.getItem('refresh_token'));

     return tokenNotExpired();*/
  }

  private scheduleRefresh() {
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
      this.getNewJwt().subscribe();
    });
  }

  public startupTokenRefresh() {
    // If the user is authenticated, use the token stream
    // provided by angular2-jwt and flatMap the token

    console.log('startupTokenRefresh');

    this.loggedIn()
      .subscribe(res => {
        if(!!res) {
          this.getMe()
            .subscribe(
              res => {
                this.setUserData(res);
              }
            );

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
            this.getNewJwt()
              .subscribe(res => {
                this.scheduleRefresh();
              });
          });
        }
      });
  }

  private unscheduleRefresh() {
    // Unsubscribe fromt the refresh
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }

  private getNewJwt() {
    // Get a new JWT from Auth0 using the refresh token saved
    // in local storage

    return this.http.post('/api/auth/refresh', {token: localStorage.getItem('refresh_token')})
      .map(res => {
        let tokens = res.json();
        this.setTokens(tokens.token, tokens.refresh);

        return tokens;
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

  private setTokens(token, refreshToken): void {
    this.token = token;
    this.refreshToken = refreshToken;

    localStorage.setItem('id_token', token);
    localStorage.setItem('refresh_token', refreshToken);
  }

  private setUserData(data): void {
    localStorage.setItem('current_user', JSON.stringify(data));
  }
}
