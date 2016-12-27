import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {AuthHttp} from 'angular2-jwt';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class AdminUsersService {

  constructor(private authHttp: AuthHttp) {
  }

  getUsers() {
    return this.authHttp.get('/api/users')
      .map(res => {
        return res.json();
      });
  }

}
