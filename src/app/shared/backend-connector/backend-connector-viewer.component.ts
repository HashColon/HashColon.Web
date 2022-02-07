import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BackendConnectorService } from '@HashColon/backend-connector/backend-connector.service';

@Component({
  selector: 'hashcolon-backend-connector-viewer',
  templateUrl: './backend-connector-viewer.component.html',
  styleUrls: ['./backend-connector-viewer.component.scss']
})
export class BackendConnectorViewerComponent implements OnInit {

  wsControl = new FormControl();

  constructor(private backend: BackendConnectorService) {
    this.backend.socketReadyEvent.prependOnceListener("socketready",
      () => {
        this.wsControl.setValue(this.backend.address);
      });
  }

  ngOnInit(): void { }

  _connectBackend(address: string) { this.backend.connectBackend(address); }
  _checkIfSocketReady(): boolean { return this.backend.isSocketReady; }
  _troubleshootWSS() { window.open("https://" + this.backend.address); }
  _disconnect() { this.backend.disconnect(); }

}
