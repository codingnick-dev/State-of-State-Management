import {
  AfterContentInit,
  AfterViewInit,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FieldState, InputTypes } from '../models/formState';
import { updateField } from '../store/actions/formActions';
import { selectFieldWithKey } from '../store/selectors/formSelector';
import { customValidators } from '../validators/validators';

@Component({
  selector: 'app-form-element',
  templateUrl: './form-element.component.html',
  styleUrls: ['./form-element.component.scss'],
})
export class FormElementComponent implements OnInit, AfterContentInit {
  @Input() key: string;
  formControl: FormControl;

  element: Observable<FieldState>;
  inputTypes = InputTypes;

  constructor(
    private store: Store,
    private customValidator: customValidators
  ) {}
  ngAfterContentInit(): void {
    this.element = this.store.select(selectFieldWithKey, this.key);
    this.element.subscribe((elementUpdate) => {
      if (!this.formControl) {
        this.formControl = new FormControl(
          this.key,
          this.customValidator.getValidators(elementUpdate.validator)
        );
        this.formControl.valueChanges.subscribe((value) => {
          if (value !== elementUpdate) {
            this.inputChange(value);
          }
        });
        this.formControl.setValue(elementUpdate.value);
      }
      if (elementUpdate.renew) {
        this.formControl.updateValueAndValidity();
      }
    });
  }

  inputChange(value) {
    this.store.dispatch(
      updateField({
        update: {
          key: this.key,
          value: value,
          valid: this.formControl.valid,
          renew: false,
        },
      })
    );
  }
  ngOnInit(): void {}
}
