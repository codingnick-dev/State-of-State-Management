import { createSelector } from '@ngrx/store';
import { FormState, ShortStep } from 'src/app/models/formState';
import { ReduxState } from 'src/app/models/reduxState';

export const selectForm = (state: ReduxState) => state.registerForm;

export const selectFullForm = createSelector(
  selectForm,
  (state: FormState) => state.fields
);

export const selectFormSteps = createSelector(selectForm, (state: FormState) =>
  state.steps.map((step) => {
    let shortedSteps: ShortStep = { stepName: step.stepName, valid: step.valid }
    return shortedSteps;
  })
);

export const selectStepFields = createSelector(
  selectForm,
  (state: FormState) => state.steps[state.selectedStep].stepFields
);

export const selectFieldWithKey = createSelector(
  selectForm,
  (state: FormState, key: string) => state.fields[key]
);

export const selectStepIndex = createSelector(
  selectForm,
  (state: FormState) => state.selectedStep
);
