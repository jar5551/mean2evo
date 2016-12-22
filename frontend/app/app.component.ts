import { Component } from '@angular/core';

import {SocketService} from './services/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [SocketService]
})
export class AppComponent {
  title = 'app works!';

  constructor(private socketService: SocketService) {}

}
