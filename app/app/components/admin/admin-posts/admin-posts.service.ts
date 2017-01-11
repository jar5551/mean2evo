import {Injectable} from '@angular/core';
import {AuthHttp} from 'app/services/auth-http.service';

import {Observable} from 'rxjs/Rx';

@Injectable()
export class AdminPostsService {

  constructor(private authHttp: AuthHttp) {
  }

  getPosts() {
    return this.authHttp.get('/api/posts/all')
      .map(res => {
        return res.json();
      });
  }

  createPost(data) {
    return this.authHttp.post('/api/posts/all', data)
      .map(res => {
        return res.json();
      });
  }

}
