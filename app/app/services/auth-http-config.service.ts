import {Http} from '@angular/http';
import {AuthConfig} from 'angular2-jwt';
import {AuthHttp} from './auth-http.service';
import {AuthenticationService} from './authentication.service';
import {Router} from '@angular/router';

export function AuthHttpConfigService(http: Http, router: Router) {
  return new AuthHttp(new AuthConfig({
    headerPrefix: 'JWT',
    noJwtError: false,
  }), http, router);
}