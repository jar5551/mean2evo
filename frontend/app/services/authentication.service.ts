import { Injectable } from '@angular/core';
import { Http }    from '@angular/http';

@Injectable()
export class AuthenticationService {

  constructor(
    private http: Http
  ) { }

  signin() : Promise<AuthenticationService> {
    return this.http.post('', {
      email: 'test@test.pl',
      password: 'test'
    })
      .toPromise()
      .then(res => res.json().data)
  }
}
