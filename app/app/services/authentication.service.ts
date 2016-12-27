import {Injectable} from '@angular/core';
import {Http}    from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {tokenNotExpired, AuthHttp} from 'angular2-jwt';

@Injectable()
export class AuthenticationService {
  public token: string;

  constructor(private http: Http, private authHttp: AuthHttp) {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
  }

  login(email: string, password: string) {
    return this.http.post('/api/auth/signin', {email: email, password: password})
      .map(res => {
        let token = res.json().token;

        if (token) {
          this.token = token;

          localStorage.setItem('id_token', token);

          return true;
        } else {
          return false;
        }
        //res.json()
      });
  }

  logout() {

    this.token = null;
    localStorage.removeItem('id_token');

    this.authHttp.get('/api/auth/logout')
      .subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log('erro', err)
        }
      );
    //localStorage.removeItem('id_token');
  }

  loggedIn() {
    return tokenNotExpired();
  }

}
