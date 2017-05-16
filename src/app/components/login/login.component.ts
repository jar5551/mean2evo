import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from 'app/services/authentication.service';
import {Router} from '@angular/router';
import {LoadingService} from 'app/components/loading/loading.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthenticationService]
})
export class LoginComponent implements OnInit {
  public loginData = {
    email: '',
    password: ''
  };

  public errorMsg: string = '';
  public loading: boolean = false;

  constructor(private authenticationService: AuthenticationService,
              private router: Router, private loadingService: LoadingService) {
  }

  ngOnInit() {
    //this.authenticationService.logout();
    /*if(this.authenticationService.loggedIn()) {
     this.router.navigate(['/admin/dashboard']);
     }*/

    this.loadingService.dismiss();

    this.authenticationService.loggedIn()
      .subscribe(
        res => {
          if (!!res) {
            this.router.navigate(['/']);
          }
        }
      );
  }

  login() {
    if (this.loading)
      return;

    if (!this.loginData.email || !this.loginData.password) {
      this.handleError();
      return;
    }

    this.loading = true;

    this.authenticationService.login(this.loginData.email, this.loginData.password)
      .subscribe(
        res => {
          console.log(res);
          this.loading = false;
          this.router.navigate(['/']);
        },
        err => {
          this.loading = false;
          this.handleError();
        }
      );

    console.log('signIn');
  }

  handleError() {
    this.errorMsg = 'Invalid email and/or password';
  }

  clearError() {
    this.errorMsg = '';
  }

}
