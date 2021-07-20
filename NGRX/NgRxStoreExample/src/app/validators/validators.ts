import { Injectable } from '@angular/core';
import { FormControl, ValidatorFn, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { FieldState } from '../models/formState';
import { revalidateField } from '../store/actions/formActions';
import { selectFieldWithKey } from '../store/selectors/formSelector';

export enum availableValidators {
  required = 'required',
  password = 'password',
  confirmPassword = 'confirmPassword',
}

@Injectable({
  providedIn: 'root',
})
export class customValidators {
  passwordField = '';
  constructor(private store: Store) {}

  getValidators(validator: availableValidators[]): ValidatorFn[] {
    let allValidators = validator.map((singleValidator) => {
      switch (singleValidator) {
        case availableValidators.required:
          return Validators.required;
        case availableValidators.password:
          return this.password.bind(this);
        case availableValidators.confirmPassword:
          return this.confirmPassword.bind(this);
      }
    });
    return allValidators;
  }

  private confirmPassword(fieldControl: FormControl) {
    return this.passwordField === fieldControl.value
      ? null
      : {
          NotEqual: true,
        };
  }

  private password(fieldControl: FormControl) {
    this.passwordField = fieldControl.value;
    this.store.dispatch(revalidateField({ key: 'confirmPassword' }));
    return null;
  }
}
