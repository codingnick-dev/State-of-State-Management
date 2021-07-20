import { Component, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { take } from 'rxjs/operators';
import { StatefulService } from '../services/stateful-service/stateful-service.service';

@Component({
  selector: 'app-address-input',
  templateUrl: './address-input.component.html',
  styleUrls: ['./address-input.component.scss'],
})
export class AddressInputComponent implements OnInit {
  addressGroup: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    street: new FormControl(''),
    streetNo: new FormControl(''),
    postalCode: new FormControl(''),
    city: new FormControl(''),
  });

  constructor(private statefullService: StatefulService) {
    this.statefullService
      .getBillingState()
      .pipe(take(1))
      .subscribe((billingState) => {
        this.addressGroup.setValue({
          firstName: billingState.firstName,
          lastName: billingState.lastName,
          street: billingState.street,
          streetNo: billingState.streetNo,
          postalCode: billingState.postalCode,
          city: billingState.city,
        });
      });
    this.addressGroup.valueChanges.subscribe(() => {
      let groupValue = this.addressGroup.value;
      this.statefullService.updateBillingState({
        firstName: groupValue.firstName,
        lastName: groupValue.lastName,
        street: groupValue.street,
        streetNo: groupValue.streetNo,
        postalCode: groupValue.postalCode,
        city: groupValue.city,
      });
    });
  }

  ngOnInit(): void {}
}
