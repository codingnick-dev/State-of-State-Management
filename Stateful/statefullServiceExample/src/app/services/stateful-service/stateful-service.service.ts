import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Address } from 'src/app/models/address';
import { AddressState, initalState } from 'src/app/models/state';

@Injectable({
  providedIn: 'root',
})
export class StatefulService {
  state: BehaviorSubject<AddressState> = new BehaviorSubject(initalState);
  constructor() {}

  getDeliveryState() {
    return this.state.pipe(
      map((addressState) => this.deepCopy(addressState.delivery))
    );
  }

  getBillingState() {
    return this.state.pipe(
      map((addressState) => this.deepCopy(addressState.billing))
    );
  }

  getSyncAddress() {
    return this.state.pipe(
      map((addressState) => this.deepCopy(addressState.syncAddress))
    );
  }

  updateSyncAddressState(value: boolean) {
    let stateChange = { ...this.state.value, syncAddress: value };
    if (value === true) {
      stateChange.delivery = this.deepCopy(this.state.value.billing);
    }
    this.state.next({
      ...stateChange,
    });
  }

  updateBillingState(address: Address) {
    if (this.state.value.syncAddress) {
      this.state.next({
        ...this.state.value,
        billing: this.deepCopy(address),
        delivery: this.deepCopy(address),
      });
    } else {
      this.state.next({
        ...this.state.value,
        billing: this.deepCopy(address),
      });
    }
  }

  updateDeliveryState(address: Address) {
    this.state.next({
      ...this.state.value,
      delivery: this.deepCopy(address),
    });
  }

  deepCopy(value) {
    return JSON.parse(JSON.stringify(value));
  }
}
