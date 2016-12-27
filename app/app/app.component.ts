import { Component } from '@angular/core';

import {SocketService} from './services/socket.service';
import {SocketItem} from './models/socket-item.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
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
