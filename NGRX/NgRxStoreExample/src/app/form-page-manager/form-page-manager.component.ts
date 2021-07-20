import { LEADING_TRIVIA_CHARS } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormState, ShortStep } from '../models/formState';
import { nextStep, prevStep, updateField } from '../store/actions/formActions';
import {
  selectFormSteps,
  selectStepIndex,
  selectStepFields,
  selectForm,
} from '../store/selectors/formSelector';

@Component({
  selector: 'app-form-page-manager',
  templateUrl: './form-page-manager.component.html',
  styleUrls: ['./form-page-manager.component.scss'],
})
export class FormPageManagerComponent implements OnInit {
  allSteps: Observable<ShortStep[]>;
  allStepKeys: Observable<string[]>;
  stepIndex: Observable<number>;

  stateShow = true;
  stateShowSteps: Observable<any>;
  stateShowFields: Observable<any>;

  constructor(private store: Store) {
    this.allSteps = store.select(selectFormSteps);
    this.allStepKeys = store.select(selectStepFields);
    this.stepIndex = store.select(selectStepIndex);

    this.stateShowSteps = store.select(selectForm).pipe(
      map((form) => {
        return `"${form.selectedStep}": ${JSON.stringify(
          form.steps[form.selectedStep],
          null,
          '\t'
        )}`;
      })
    );
    this.stateShowFields = store.select(selectForm).pipe(
      map((form) => {
        let stepFields = form.steps[form.selectedStep].stepFields;
        let allFields = form.fields;
        return JSON.stringify(
          stepFields.reduce((prev, fieldName) => {
            prev[fieldName] = allFields[fieldName];
            prev[fieldName] = {
              value: prev[fieldName].value,
              valid: prev[fieldName].valid,
              type: prev[fieldName].type,
            };
            return prev;
          }, {}),
          null,
          '\t'
        );
      })
    );
  }

  ngOnInit(): void {}

  nextStep(): void {
    this.store.dispatch(nextStep());
  }

  prevStep(): void {
    this.store.dispatch(prevStep());
  }
}
