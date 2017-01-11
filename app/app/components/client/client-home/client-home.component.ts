import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from 'app/services/authentication.service';
import {ClientHomeService} from './client-home.service';

@Component({
  selector: 'app-client-home',
  templateUrl: './client-home.component.html',
  styleUrls: ['./client-home.component.scss'],
  providers: [AuthenticationService, ClientHomeService]
})
export class ClientHomeComponent implements OnInit {

  public loggedIn: boolean = false;
  public posts: Array<any>;

  constructor(private authenticationService: AuthenticationService,
              private clientHomeService: ClientHomeService) {

  }

  ngOnInit() {
    this.authenticationService.loggedIn()
      .subscribe(res => {
          this.loggedIn = !!res;
        });

    this.clientHomeService.getPosts()
      .subscribe(res => {
        this.posts = res;
      })
  }

  /*loggedIn() {
   //return this.authenticationService.loggedIn();
   }*/

}
