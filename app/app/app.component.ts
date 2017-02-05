import {Component} from '@angular/core';

import {SocketService} from './services/socket.service';
import {SocketItem} from './models/socket-item.model';
import {BaImageLoaderService, BaThemePreloader, BaThemeSpinner} from './theme/services';
import { BaThemeConfig } from './theme/theme.config';
import { layoutPaths } from './theme/theme.constants';

import 'style-loader!./app.component.scss';
import 'style-loader!./theme/initial.scss';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [SocketService]
})
export class AppComponent {
  title = 'app works!';

  constructor(private socketService: SocketService) {
    this.socketService
      .get()
      .subscribe((socketItem: SocketItem) => {
        console.log('socket');
      })
  }

}
