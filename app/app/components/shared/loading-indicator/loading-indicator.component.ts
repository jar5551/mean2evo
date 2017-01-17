import {Component, ElementRef, OnInit, OnDestroy, trigger, style, transition, animate} from '@angular/core';
import {LoadingService} from './loading.service';

@Component({
  selector: 'app-loading-indicator',
  templateUrl: './loading-indicator.component.html',
  styleUrls: ['./loading-indicator.component.scss'],
  animations: [
    trigger('myAnimation', [
      transition(
        ':enter', [
          style({opacity: 0}),
          animate('100ms', style({opacity: 1}))
        ]),
      transition(
        ':leave', [
          style({'opacity': 1}),
          animate('100ms', style({opacity: 0}))
        ])
  ])]
})

export class LoadingIndicatorComponent implements OnInit, OnDestroy {

  //Source of solution: http://tombuyse.com/creating-a-loading-indicator-in-angular-2-ionic-2/

  private isLoading = false;
  private subscription: any;

  //we probably want a reference to ElementRef here to do some DOM manipulations
  constructor(public el: ElementRef, public loadingService: LoadingService) {
  }

  showOrHideLoadingIndicator(loading) {
    this.isLoading = loading;
    //if (this.isLoading) this.playLoadingAnimation();
    //else cancel the animation?
  }

  /*playLoadingAnimation() {
    //this will be your implementation to start the loading animation
  }*/

  ngOnInit() {
    this.subscription = this.loadingService.loading$.subscribe(loading =>
      this.showOrHideLoadingIndicator(loading)
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
