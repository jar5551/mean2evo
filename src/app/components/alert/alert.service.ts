import {Injectable} from '@angular/core';
import {Observable, Observer} from 'rxjs/Rx';

@Injectable()
export class AlertService {

  alert$: Observable<Boolean>;
  private _observer: Observer<any>;

  constructor() {
    this.alert$ = new Observable(
      observer => {
        this._observer = observer
      }).share();
  }

  private toggleAlert(value: Boolean, title?: string, description?: string) {
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
    this.toggleAlert(true, title, description);
  }

  dismiss() {
    this.toggleAlert(false);
  }

}
