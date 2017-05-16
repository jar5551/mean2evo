import {Injectable} from '@angular/core';
import {Observable, Observer} from 'rxjs/Rx';

@Injectable()
export class LoadingService {

  loading$: Observable<Boolean>;
  private _observer: Observer<Boolean>;

  constructor() {
    this.loading$ = new Observable(
      observer => {
        this._observer = observer
      }).share();

    //TODO: canceling loader on route or resource change
  }

  private toggleLoadingIndicator(value: Boolean) {
    if (this._observer) {
      this._observer.next(value);
    }
  }

  present() {
    this.toggleLoadingIndicator(true);
  }

  dismiss() {
    this.toggleLoadingIndicator(false);
  }
}
