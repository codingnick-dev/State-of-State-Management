import { ValidatorFn, Validators } from '@angular/forms';
import { createReducer, on, Action } from '@ngrx/store';
import {
  FormState,
  initialAppState,
  FieldState,
} from 'src/app/models/formState';
import { customValidators } from 'src/app/validators/validators';
import {
  nextStep,
  updateField,
  prevStep,
  validateStep,
  revalidateField,
} from '../actions/formActions';

export const userFeatureKey = 'AppState';

export const reducer = createReducer(
  initialAppState as FormState,
  on(updateField, (state, change) => {
    let key = '' + change.update.key;
    let changedFields = { ...change.update, key: undefined };
    const stateChange = {
      fields: {
        ...state.fields,
        [key]: {
          ...state.fields[key],
          ...changedFields,
        },
      },
    };
    return {
      ...state,
      ...stateChange,
    };
  }),
  on(nextStep, (state, change) => {
    return {
      ...state,
      selectedStep: state.selectedStep + 1,
    };
  }),
  on(prevStep, (state, change) => {
    return {
      ...state,
      selectedStep: state.selectedStep - 1,
    };
  }),
  on(validateStep, (state) => {
    let fieldsToCheck = state.steps[state.selectedStep].stepFields;
    let valid = fieldsToCheck.every((fieldName) => {
      return state.fields[fieldName].valid;
    });
    let updatedStep = { steps: [...state.steps] };
    updatedStep.steps[state.selectedStep] = {
      ...state.steps[state.selectedStep],
      valid: valid,
    };
    return {
      ...state,
      ...updatedStep,
    };
  })
);

export function FormReducer(state: FormState, action: Action): FormState {
  return reducer(state as FormState, action as Action);
}
