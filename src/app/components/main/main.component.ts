import { Component, OnInit } from '@angular/core';
import {Routes} from '@angular/router';
import {MENU} from './../../app.menu';
import {BaMenuService} from './../../theme';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private _menuService: BaMenuService) {
  }

  ngOnInit() {
    this._menuService.updateMenuByRoutes(<Routes>MENU);
  }

}
