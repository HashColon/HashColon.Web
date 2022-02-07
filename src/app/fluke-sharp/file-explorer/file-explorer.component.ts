import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSelectionList } from '@angular/material/list';
import { FileExplorerService } from '@FlukeSharp/services/file-explorer.service';
import { BackendConnectorService } from '@HashColon/shared/backend-connector/backend-connector.service';

@Component({
  selector: 'fluke-file-explorer',
  templateUrl: './file-explorer.component.html',
  styleUrls: ['./file-explorer.component.scss']
})
export class FileExplorerComponent implements OnInit {
  @ViewChild('geojsonList') geojsonList!: MatSelectionList;
  selectedFiles: string[];

  constructor(
    private action: FileExplorerService,
    private backend: BackendConnectorService
  ) {
    this.selectedFiles = action.selectedFiles;
  }

  ngOnInit(): void {
    this.action.pushedAction.subscribe((actionName: string) => {
      if (actionName == 'SelectAll') {
        this.geojsonList.selectAll();
        this._updateSelectionChange();
      }
      else if (actionName == 'DeselectAll') {
        this.geojsonList.deselectAll();
        this._updateSelectionChange();
      }
    });
  }

  _checkIfSocketReady(): boolean { return this.backend.isSocketReady; }
  _getGeojsonFiles(): string[] { return this.action.geojsonFiles; }
  _updateSelectionChange() {
    // clear selected files
    this.action.selectedFiles = [];
    for (var val of this.geojsonList.selectedOptions.selected) {
      this.action.selectedFiles.push(val.value);
    }
    console.log(this.action.selectedFiles);
  }
}
