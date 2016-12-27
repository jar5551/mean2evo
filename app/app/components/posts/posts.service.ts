import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/Rx';

@Injectable()
export class PostsService {

  constructor(public http:Http) {
  }

  getPosts() {
    return this.http.get('/api/posts')
      .map(res=>res.json());
  }

}
