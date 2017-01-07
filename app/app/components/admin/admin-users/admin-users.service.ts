import {Injectable} from '@angular/core';
import {AuthHttp} from 'app/services/auth-http.service';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class AdminUsersService {

  constructor(private authHttp: AuthHttp) {
  }

  getUsers() {
    console.log('getUsers');
    return this.authHttp.get('/api/users')
      .map(res => {
        return res.json();
      });
  }

}
