import {Http} from '@angular/http';
import {AuthHttp, AuthConfig} from 'angular2-jwt';

export function AuthHttpService(http: Http) {
  return new AuthHttp(new AuthConfig({
    headerPrefix: 'JWT',
  }), http);
}