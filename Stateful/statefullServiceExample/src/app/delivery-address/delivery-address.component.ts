import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { StatefulService } from '../services/stateful-service/stateful-service.service';

@Component({
  selector: 'app-delivery-address',
  templateUrl: './delivery-address.component.html',
  styleUrls: ['./delivery-address.component.scss'],
})
export class DeliveryAddressComponent implements OnInit, OnChanges {
  @Input() disabled: boolean;

  deliveryAddress = this.statefullService.getDeliveryState();

  deliveryAddressGroup: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    street: new FormControl(''),
    streetNo: new FormControl(''),
    postalCode: new FormControl(''),
    city: new FormControl(''),
  });
  changed = false;
  constructor(private statefullService: StatefulService) {
    this.deliveryAddress.subscribe((deliveryAddressState) => {
      this.deliveryAddressGroup.patchValue(
        {
          ...deliveryAddressState,
        },
        { emitEvent: false }
      );
    });
    this.deliveryAddressGroup.valueChanges.subscribe((value) => {
      let groupValue = this.deliveryAddressGroup.value;
      this.statefullService.updateDeliveryState({
        firstName: groupValue.firstName,
        lastName: groupValue.lastName,
        street: groupValue.street,
        streetNo: groupValue.streetNo,
        postalCode: groupValue.postalCode,
        city: groupValue.city,
      });
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.disabled) {
      if (this.disabled) {
        this.deliveryAddressGroup.disable();
        return;
      }
      this.deliveryAddressGroup.enable();
    }
  }

  ngOnInit(): void {}
}
