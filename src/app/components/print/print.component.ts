import { Component, OnInit, Input } from '@angular/core';
import {AuthenticationService} from './../../services/authentication.service';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.scss']
})
export class PrintComponent implements OnInit {
  @Input() formAction: String;
  @Input() data: String;
  public token: String;
  //public formAction: String;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  public print() {
    this.token = this.authenticationService.getUserToken();

    setTimeout(() => {
      let f = <HTMLFormElement>document.getElementById('print');
      f.submit();
      this.token = '';
    });
  }

}
