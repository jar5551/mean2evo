import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Observable, Observer} from 'rxjs/Rx';
import 'rxjs/add/operator/share';

@Injectable()
export class LoadingService {

  //Source of solution: http://tombuyse.com/creating-a-loading-indicator-in-angular-2-ionic-2/

  loading$: Observable<String>;
  private _observer: Observer<String>;

  constructor(private router: Router) {
    /*this.router.events.pairwise().subscribe(
      event => {
        console.log(event);
        this.toggleLoadingIndicator(false);
      }
    );*/

    //TODO: canceling loader on route or resource change

    this.loading$ = new Observable(
      observer => {
        this._observer = observer
      }).share();

  }

  toggleLoadingIndicator(name) {
    if (this._observer) {
      this._observer.next(name);
    }
  }
}
