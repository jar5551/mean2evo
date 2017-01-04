import {Injectable} from '@angular/core';
import {AuthHttp} from 'angular2-jwt';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class AdminPostsService {

  constructor(private authHttp: AuthHttp) {
  }

  getPosts() {
    return this.authHttp.get('/api/posts')
      .map(res => {
        return res.json();
      });
  }

}