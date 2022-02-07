import { Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { HashColonMessage, HashColonMessageType } from './hashcolon-message';
import { EventEmitter } from 'events';

@Injectable({
  providedIn: 'root'
})
export class BackendConnectorService {

  @Output() socketReadyEvent = new EventEmitter();

  messageList: { [key: string]: any } = {};

  isSocketReady: boolean = false;
  address: string = '';
  ws: WebSocket | null = null;

  constructor(

  ) { }

  connectBackend(address: string) {
    if (!this.isSocketReady || this.address != address) {
      this.address = address;

      this.ws = new WebSocket("wss://" + address);
      console.log('socket connection trial');
      this.ws.onopen = event => {
        this.isSocketReady = true;
        this.socketReadyEvent.emit("socketready");
      };
      this.ws.onclose = event => {
        this.isSocketReady = false;
        this.socketReadyEvent.emit("socketclosed");
      }
    }
  }

  disconnect() {
    this.ws?.close();
    this.ws = null;
    this.isSocketReady = false;
    this.address = '';
  }

  generateKey(): string {
    var genkey: string;
    do {
      genkey = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 10)
    } while (genkey in this.messageList)
    return genkey;
  }

  removeKey() { }

  getConnector(): Observable<any> {
    return new Observable((observer) => {
      if (this.ws) {
        this.ws.onmessage = (event) => observer.next(event.data);
        this.ws.onerror = (event) => observer.error(event);
        this.ws.onclose = (event) => observer.complete();
      }
    });
  }

  sendMessage(msg: HashColonMessage): string {
    if (this.isSocketReady && this.ws) {
      this.ws.send(JSON.stringify(msg));
      this.messageList[msg.messageKey] = msg;
      return msg.messageKey;
    }
    else return "";
  }

  // getGeoJson(filepath: string): Observable<any> {
  //   return this.http.get(filepath);
  // }

  requestGeoJsons(filepaths: string[]): string {
    if (this.isSocketReady) {
      var msg: HashColonMessage = {
        messageType: HashColonMessageType.req_geojson,
        messageKey: this.generateKey(),
        messageContent: {
          filepaths: filepaths
        }
      };
      return this.sendMessage(msg);
    }
    else return "";
  }

  requestFileList(root: string, extension: string, recursive: boolean = false, options?: any): string {
    if (this.isSocketReady) {
      var msg: HashColonMessage = {
        messageType: HashColonMessageType.req_filelist,
        messageKey: this.generateKey(),
        messageContent: {
          root: root,
          extension: extension,
          recursive: recursive,
          globoptions: options
        }
      };
      return this.sendMessage(msg);
    }
    else return "";
  }

  requestDirList(root: string): string {
    if (this.isSocketReady) {
      var msg: HashColonMessage = {
        messageType: HashColonMessageType.req_dirlist,
        messageKey: this.generateKey(),
        messageContent: { root: root }
      };
      return this.sendMessage(msg);
    }
    else return "";
  }

  runBashCommand() { }
}
