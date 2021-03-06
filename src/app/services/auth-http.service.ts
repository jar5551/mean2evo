import {Injectable, Inject} from '@angular/core';
import {Http, Request, Response, RequestOptionsArgs} from '@angular/http';
import {Router} from '@angular/router';
import {AuthHttp as JwtAuthHttp, AuthConfig} from 'angular2-jwt';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthHttpService extends JwtAuthHttp {
  constructor(options: AuthConfig, http: Http, public router: Router ) {
    super(options, http);
  }

  private isUnauthorized(status: number): boolean {
    return status === 401;
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    let response = super.request(url, options);

    return response.catch(res => {
      if (this.isUnauthorized(res.status)) {
        //TODO check is any posibility to use here AuthenticationService, because for now it causes errors
        //localStorage.removeItem('id_token');
        //localStorage.removeItem('refresh_token');
        localStorage.clear();
        this.router.navigate(['/login']);
        return res;
      }
    });
  }
}
