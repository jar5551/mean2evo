import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class ClientHomeService {

  constructor(private http: Http) {
  }

  getPosts() {
    return this.http.get('/api/posts')
      .map(res => {
        return res.json();
      })
  }

}
