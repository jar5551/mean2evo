import {Component, OnInit, OnDestroy} from '@angular/core';
import {AlertService} from './alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  private dialog = {
    value: false,
    title: '',
    description: ''
  };
  private subscription: any;

  constructor(public alertService: AlertService) { }

  ngOnInit() {
    this.subscription = this.alertService.alert$.subscribe(confirm =>
      this.showOrHideAlert(confirm)
    );
  }

  showOrHideAlert(confirm) {
    this.dialog = confirm;
  }

  cancel() {
    this.alertService.dismiss();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
