import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { GeoJSON } from 'leaflet';
import { BackendConnectorService } from '@HashColon/shared/backend-connector/backend-connector.service';
import { HashColonMessage, HashColonMessageType } from '@HashColon/shared/backend-connector/hashcolon-message';
import { LayerManagerService } from '@FlukeSharp/services/layer-manager.service';

enum msgtype { filelist, dirlist, geojson };

@Injectable({
  providedIn: 'root'
})
export class FileExplorerService {

  // path input form-field   
  currentPath: string = '';
  pathCandidateList: string[] = [];

  // file list in side view  
  geojsonFiles: string[] = [];
  selectedFiles: string[] = [];

  // backend messages
  msgKeyList: { [key: string]: msgtype } = {};
  _isLoading(): boolean {
    return Object.keys(this.msgKeyList).length != 0;
  }

  // observable for action pushes
  private pushedActionSrc = new Subject<string>();
  pushedAction = this.pushedActionSrc.asObservable();
  pushAction(action: string) {
    this.pushedActionSrc.next(action);
  }

  // backend requests
  requestFileList(path: string, extension: string, recursive: boolean = false, options?: any) {
    var key = this.backend.requestFileList(path, extension, recursive, options);
    this.msgKeyList[key] = msgtype.filelist;
  }

  requestDirList(root: string) {
    var key = this.backend.requestDirList(root);
    this.msgKeyList[key] = msgtype.dirlist;
  }

  requestSelectedGeoJson(path: string) {
    var reqfilelist: string[] = [];
    for (var afile of this.selectedFiles) {
      try {
        var refinedPath: string = path.endsWith('/')
          ? path : path + '/';
        reqfilelist.push(refinedPath + afile);
      } catch (e) { }
    }
    var key = this.backend.requestGeoJsons(reqfilelist);
    this.msgKeyList[key] = msgtype.geojson;
  }

  renewDirList(currentDir: string) {
    this.requestDirList(currentDir);
  }

  renewFileList(currentDir: string, extension: string) {
    this.requestFileList(currentDir, extension);
  }

  // retrievement from backend  
  retrieveFileList(msg: HashColonMessage) {
    this.geojsonFiles = msg.messageContent as string[];
    // this.geojsonFiles.splice(0);
    // this.geojsonFiles.concat(msg.messageContent);
    delete this.msgKeyList[msg.messageKey];
  }

  retrieveDirList(msg: HashColonMessage) {
    this.pathCandidateList = msg.messageContent as string[];
    delete this.msgKeyList[msg.messageKey];
  }

  retrieveGeoJson(msg: HashColonMessage) {
    var geojsons = msg.messageContent;
    for (var item of geojsons) {
      try {
        var geojson = JSON.parse(item.geojson);
        this.layers.pushGeoJsonLayer(geojson, item.filename);
      } catch (e) { console.error(e); }
    }
    delete this.msgKeyList[msg.messageKey];
  }

  // server event handlers
  _onSocketReady(): void {
    this.backend.getConnector()
      .subscribe(
        (data) => {
          var parsedJson: HashColonMessage;
          try {
            parsedJson = JSON.parse(data);
          } catch (e) {
            console.error('Parsing returned message failed');
            return;
          }
          if (parsedJson.messageType == HashColonMessageType.error) {
            switch (this.msgKeyList[parsedJson.messageKey]) {
              case msgtype.dirlist:
              case msgtype.filelist:
                break;
              default:
                console.error(parsedJson.messageContent);
            }

          }
          else if (parsedJson.messageType == HashColonMessageType.return) {
            switch (this.msgKeyList[parsedJson.messageKey]) {
              case msgtype.dirlist:
                this.retrieveDirList(parsedJson);
                break;
              case msgtype.filelist:
                this.retrieveFileList(parsedJson);
                break;
              case msgtype.geojson:
                this.retrieveGeoJson(parsedJson);
                break;
              default:
                break;
            }
          }
        });
    this.requestFileList('', '.json');
    this.requestDirList('');

  }

  constructor(
    public backend: BackendConnectorService,
    public layers: LayerManagerService
  ) {
    this.backend.socketReadyEvent.prependOnceListener("socketready", () => {
      this._onSocketReady();
    });
  }
}
