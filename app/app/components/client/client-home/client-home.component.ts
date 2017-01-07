import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from 'app/services/authentication.service';

@Component({
  selector: 'app-client-home',
  templateUrl: './client-home.component.html',
  styleUrls: ['./client-home.component.scss'],
  providers: [AuthenticationService]
})
export class ClientHomeComponent implements OnInit {

  public loggedIn: boolean = false;

  constructor(private authenticationService: AuthenticationService) {
    this.authenticationService.loggedIn()
      .subscribe(
        res => {
          this.loggedIn = !!res;
        }
      );
  }

  ngOnInit() {
  }

  /*loggedIn() {
    //return this.authenticationService.loggedIn();
  }*/

}
