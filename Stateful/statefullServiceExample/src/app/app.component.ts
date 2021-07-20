import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AddressState } from './models/state';
import { StatefulService } from './services/stateful-service/stateful-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  syncAddress: Observable<boolean>;
  stateDelivery: Observable<String>;
  stateBilling: Observable<String>;
  syncAddressText: Observable<String>;
  title = 'statefullServiceExample';
  highlighting = true;
  constructor(private statefullService: StatefulService) {
    this.syncAddress = statefullService
      .getSyncAddress()
      .pipe(map((sync) => !sync));
    this.stateDelivery = statefullService.state.pipe(
      map((obj) => `"delivery:"${JSON.stringify(obj.delivery, null, 4)},`)
    );
    this.stateBilling = statefullService.state.pipe(
      map((obj) => `"billing:"${JSON.stringify(obj.billing, null, 4)},`)
    );
    this.syncAddressText = statefullService.state.pipe(
      map((obj) => `"syncAddress:"${JSON.stringify(obj.syncAddress, null, 4)},`)
    );
  }

  toggleSync(event) {
    this.statefullService.updateSyncAddressState(!event.target.checked);
  }
}
