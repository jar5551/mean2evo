import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from './../../../services/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss'],
  providers: [AuthenticationService]
})
export class AdminLoginComponent implements OnInit {

  public loginData = {
    email: '',
    password: ''
  };

  constructor(private authenticationService: AuthenticationService,
              private router: Router) {
    console.log('Login component consturtor go!');
  }

  ngOnInit() {
    this.authenticationService.logout();
  }

  login() {
    this.authenticationService.login(this.loginData.email, this.loginData.password)
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/admin/dashboard']);
        },
        err => {
          console.log('error', err);
        }
      );

    console.log('signIn');
  }

}
