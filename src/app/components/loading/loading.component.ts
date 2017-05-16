import {Component, OnInit, OnDestroy} from '@angular/core';
import {LoadingService} from './loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit, OnDestroy {

  private isLoading = false;
  private subscription: any;

  constructor(public loadingService: LoadingService) {
  }

  ngOnInit() {
    this.subscription = this.loadingService.loading$.subscribe(loading =>
      this.showOrHideLoadingIndicator(loading)
    );
  }


  showOrHideLoadingIndicator(loading) {
    this.isLoading = loading;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
