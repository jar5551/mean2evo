import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from './../../../services/authentication.service';

@Component({
  selector: 'app-client-home',
  templateUrl: './client-home.component.html',
  styleUrls: ['./client-home.component.scss'],
  providers: [AuthenticationService]
})
export class ClientHomeComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  loggedIn() {
    return this.authenticationService.loggedIn();
  }

}
