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

  constructor(
    public action: FileExplorerService,
    public backend: BackendConnectorService
  ) { }

  ngOnInit(): void {
    this.action.pushedAction.subscribe((actionName: string) => {
      if (actionName == 'SelectAll') {
        this.geojsonList.selectAll();
      }
      else if (actionName == 'DeselectAll') {
        this.geojsonList.deselectAll();
      }
    });
  }
}
