import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FileExplorerService } from '@FlukeSharp/services/file-explorer.service';
import { BackendConnectorService } from '@HashColon/shared/backend-connector/backend-connector.service';


@Component({
  selector: 'fluke-file-explorer-tools',
  templateUrl: './file-explorer-tools.component.html',
  styleUrls: ['./file-explorer-tools.component.scss']
})
export class FileExplorerToolsComponent implements OnInit {

  pathCtrl: FormControl = new FormControl();

  constructor(
    private action: FileExplorerService,
    private backend: BackendConnectorService
  ) { }

  ngOnInit(): void {
    this.pathCtrl.setValue(this.action.currentPath);
  }

  _editPathSynced() {
    this.action.currentPath = this.pathCtrl.value;
    this.action.requestFileList(this.pathCtrl.value, ".json");
    this.action.requestDirList(this.pathCtrl.value);
  }

  _setPathHome() {
    this.pathCtrl.setValue('');
    this._editPathSynced();
  }

  _selectAll() {
    this.action.pushAction('SelectAll');
  }

  _deselectAll() {
    this.action.pushAction('DeselectAll');
  }

  _requestSelectedGeoJson() {
    console.log(this.pathCtrl.value);
    this.action.requestSelectedGeoJson(this.pathCtrl.value);
  }

  _checkIfSocketReady(): boolean { return this.backend.isSocketReady; }
  _getPathCandidates(): string[] { return this.action.pathCandidateList; }

}
