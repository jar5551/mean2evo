import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import * as io from 'socket.io-client';


@Injectable()
export class SocketService {
  private name;
  private socket;
  private host = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port;


  constructor() {
    //this.socket = io.connect(this.host);
  }
  
  get(name?: string): Observable<any> {
    if(!name)
      name = '';

    this.name = name;


    this.socket = io.connect(this.host + '/' + name);
    this.socket.on('connect', () => this.connect());
    this.socket.on('disconnect', () => this.disconnect());

    return Observable.create((observer: any) => {
      this.socket.on('create', (item: any) => observer.next({ action: 'create', item: item }) );

      return () => this.socket.close();
    });
  }

  create(name: string) {
    this.socket.emit('create', name);
  }

  private connect() {
    console.log('Connected to ' + this.name);

    // Request initial list when connected
    this.socket.emit('list');
  }

  private disconnect() {
    console.log(`Disconnected from '${this.name}'`);
  }
}
