import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AuthenticationService]
})
export class AppComponent implements OnInit {

  constructor(private router: Router,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.authenticationService.startupTokenRefresh();

    /*console.log( this.unitsService.nameChange.subscribe((value) => {
      console.log("Subscription got", value);
    }));

    this.unitsService.nameChange.subscribe((value) => {
      console.log("Subscription got", value);
    });*/

    /*if (this.router.url == '/')
      this.router.navigate(['/dashboard']);*/
  }

  logout() {
    console.log('logout');

    this.authenticationService.logout()
      .subscribe(
        res => {
          this.router.navigate(['/login']);
        }
      );
  }
}
