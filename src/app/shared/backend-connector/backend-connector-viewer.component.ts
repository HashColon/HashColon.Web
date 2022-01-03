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

  constructor(public backend: BackendConnectorService) {
    this.backend.socketReadyEvent.prependOnceListener("socketready",
      () => {
        this.wsControl.setValue(this.backend.address);
      });
  }

  ngOnInit(): void {
  }

  connectBackend(address: string) {
    this.backend.connectBackend(address);
  }

  troubleshootWSS() {
    window.open("https://" + this.backend.address);
  }

}
