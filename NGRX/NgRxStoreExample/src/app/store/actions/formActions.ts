import { createAction, props } from '@ngrx/store';

export const updateField = createAction(
  '[formAction] updateField',
  props<{
    update: {
      key: string;
      value?: string | Date;
      valid?: boolean;
      renew?: boolean;
    };
  }>()
);

export const validateStep = createAction('[formAction] validateStep');
export const revalidateField = createAction(
  '[formAction] revalidateField',
  props<{ key: string }>()
);

export const nextStep = createAction('[formAction] nextStep');
export const prevStep = createAction('[formAction] prevStep');
