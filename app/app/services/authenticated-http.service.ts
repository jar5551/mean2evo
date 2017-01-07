import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Http, Request, Response, RequestOptionsArgs} from '@angular/http';
import {AuthHttp as JwtAuthHttp, AuthConfig} from 'angular2-jwt';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthHttp extends JwtAuthHttp {

  constructor(options: AuthConfig, http: Http, private _router: Router) {
    super(options, http);
  }
  _isUnauthorized(status: number): boolean {
    return status === 401;
  }
  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    var response = super.request(url, options);
    response.subscribe(null, err => {
      if (this._isUnauthorized(err.status)) {
        this._router.navigate(['Login']);
      }
    });
    return response;
  }
}
