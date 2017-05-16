import {Http} from '@angular/http';
import {AuthConfig} from 'angular2-jwt';
import {AuthHttpService} from './auth-http.service';
import {Router} from '@angular/router';

export function AuthHttpConfigService(http: Http, router: Router) {
  return new AuthHttpService(new AuthConfig({
    headerPrefix: 'JWT',
    noJwtError: true,
  }), http, router);
}
