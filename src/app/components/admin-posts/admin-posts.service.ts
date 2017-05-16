import {Injectable} from '@angular/core';
import {AuthHttpService} from 'app/services/auth-http.service';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class AdminPostsService {

  constructor(private authHttp: AuthHttpService) {
  }

  getPosts() {
    return this.authHttp.get('/api/posts/all')
      .map(res => {
        return res.json();
      });
  }

  getPost(id) {
    return this.authHttp.get('/api/posts/' + id)
      .map(res => {
        return res.json();
      })
  }

  createPost(data) {
    return this.authHttp.post('/api/posts/all', data)
      .map(res => {
        return res.json();
      });
  }

  updatePost(id, data) {
    return this.authHttp.put('/api/posts/' + id, data)
      .map(res => {
        return res.json();
      })
  }

  trashPost(id) {
    return this.authHttp.delete('/api/post/' + id)
      .map(res => {
        return res.json();
      })
  }
}
