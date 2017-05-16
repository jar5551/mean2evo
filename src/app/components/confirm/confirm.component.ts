import {Component, OnInit, OnDestroy} from '@angular/core';
import {ConfirmService} from './confirm.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit, OnDestroy {

  private dialog = {
    value: false,
    title: '',
    description: ''
  };
  private subscription: any;

  constructor(public confirmService: ConfirmService) {
  }

  ngOnInit() {
    this.subscription = this.confirmService.confirm$.subscribe(confirm =>
      this.showOrHideConfirm(confirm)
    );
  }

  showOrHideConfirm(confirm) {
    this.dialog = confirm;
  }

  apply() {
    this.confirmService.apply(true);
  }

  cancel() {
    this.confirmService.dismiss();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
