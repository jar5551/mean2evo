import { Injectable } from '@angular/core';
import * as io from "socket.io-client";

@Injectable()
export class SocketService {
  private socket;
  private host = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port;


  constructor() {
    this.socket = io.connect(this.host);

  }

}
