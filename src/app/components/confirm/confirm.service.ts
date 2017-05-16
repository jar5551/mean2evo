import {Injectable} from '@angular/core';
import {Observable, Observer} from 'rxjs/Rx';

@Injectable()
export class ConfirmService {

  confirm$: Observable<Boolean>;
  action$: Observable<Boolean>;
  private _observer: Observer<any>;
  private _observerAction: Observer<Boolean>;

  constructor() {
    this.confirm$ = new Observable(
      observer => {
        this._observer = observer
      }).share();

    this.action$ = new Observable(
      observer => {
        this._observerAction = observer
      }).share();
  }

  private toggleConfirm(value: Boolean, title?: string, description?: string) {
    console.log('toggleConfirm');
    let val = {};

    val['value'] = value;

    if (title) {
      val['title'] = title;
    }

    if (description) {
      val['description'] = description;
    }

    if (this._observer) {
      this._observer.next(val);
    }
  }

  present(title, description) {
    this.toggleConfirm(true, title, description);
  }

  dismiss() {
    console.log('dismiss');
    this.toggleConfirm(false);
  }

  apply(value: Boolean) {
    console.log('clicked yes');
    if (this._observerAction) {
      this._observerAction.next(value);
    }
    this.dismiss();
  }

}
