import {Component, ElementRef, OnInit, OnDestroy} from '@angular/core';
import {LoadingService} from './loading.service';

@Component({
  selector: 'app-loading-indicator',
  templateUrl: './loading-indicator.component.html',
  styleUrls: ['./loading-indicator.component.scss']
})

export class LoadingIndicatorComponent implements OnInit, OnDestroy {
  private isLoading = false;
  private subscription: any;

  //we probably want a reference to ElementRef here to do some DOM manipulations
  constructor(public el: ElementRef, public loadingService: LoadingService) {
  }

  showOrHideLoadingIndicator(loading) {
    console.log(loading);

    this.isLoading = loading;
    if (this.isLoading) this.playLoadingAnimation();
    //else cancel the animation?
  }

  playLoadingAnimation() {
    //this will be your implementation to start the loading animation
  }

  ngOnInit() {
    this.subscription = this.loadingService.loading.subscribe(
      loading => {
        this.showOrHideLoadingIndicator(loading);
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
