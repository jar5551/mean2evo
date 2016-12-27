import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class AdminPostsService {

  constructor(private http: Http) {
  }

  getPosts() {
    return this.http.get('/api/posts')
      .map(res => {
        return res.json();
      });
  }

}
