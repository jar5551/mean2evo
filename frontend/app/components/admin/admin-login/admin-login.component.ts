import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from './../../../services/authentication.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {

  loginData = {
    email: '',
    password: ''
  };

  constructor(private authenticationService: AuthenticationService) {
    console.log('Login component consturtor go!');
  }

  ngOnInit() {
  }

  signIn() {
    console.log('signIn');
  }

}
