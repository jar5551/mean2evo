import {Component, OnInit, OnDestroy} from '@angular/core';

import {GlobalState} from '../../../global.state';
import {AppComponent} from './../../../app.component';
import {Subscription, Observable}   from 'rxjs';

import 'style-loader!./baPageTop.scss';

@Component({
  selector: 'ba-page-top',
  templateUrl: './baPageTop.html'
})
export class BaPageTop implements OnInit, OnDestroy {

  public isScrolled: boolean = false;
  public isMenuCollapsed: boolean = false;
  public selectedUnit: Object;

  private subscriptionUnit: Subscription;
  private subscriptionYear: Subscription;

  public name;

  public years: Array<any>;

  public selectedYear;

  constructor(private _state: GlobalState,
              private appComponent: AppComponent) {
    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });


    /*this._subscription = unitsService.nameChange.subscribe((value) => {
     console.log('nameChange', value);
     this.name = value;
     });*/

    /*this.nameChange.subscribe((value) => {
     console.log("Subscription got", value);
     });*/
  }

  ngOnInit() {
    //console.log(this.selectedUnit);

    /*console.log(this.unitsService.nameChange);

     this.unitsService.nameChange.subscribe(res => {
     console.log(res);
     });*/

  }

  public toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
    this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
    return false;
  }

  public scrolledChanged(isScrolled) {
    this.isScrolled = isScrolled;
  }

  public logout(e) {
    this.appComponent.logout();
    e.preventDefault();
  }

  private getCurrentUnit() {
  }

  ngOnDestroy() {
    this.subscriptionUnit.unsubscribe();
    this.subscriptionYear.unsubscribe();
  }
}
