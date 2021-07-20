import { Validator, Validators } from '@angular/forms';
import { availableValidators } from '../validators/validators';

export interface FormState {
  fields: {
    username: FieldState;
    password: FieldState;
    confirmPassword: FieldState;
    birthDay: FieldState;
    address: FieldState;
    country: FieldState;
    firstName: FieldState;
    lastName: FieldState;
    phoneNumber: FieldState;
  };
  steps: { stepName: string; stepFields: string[]; valid: boolean }[];
  selectedStep: number;
}

export enum InputTypes {
  string = 'string',
  date = 'date',
  number = 'number',
}

export interface FieldState {
  type: InputTypes;
  transName: string;
  value: any;
  valid: boolean;
  renew?: boolean;
  validator: availableValidators[];
}

export const initialAppState: FormState = {
  fields: {
    username: {
      value: '',
      transName: 'Nutzername',
      valid: false,
      type: InputTypes.string,
      validator: [availableValidators.required],
    },
    password: {
      value: '',
      transName: 'Passwort',
      valid: false,
      type: InputTypes.string,
      validator: [availableValidators.password, availableValidators.required],
    },
    confirmPassword: {
      value: '',
      transName: 'Password erneut',
      valid: true,
      type: InputTypes.string,
      renew: false,
      validator: [
        availableValidators.confirmPassword,
        availableValidators.required,
      ],
    },
    birthDay: {
      value: null,
      transName: 'Geburtsdatum',
      valid: false,
      type: InputTypes.date,
      validator: [availableValidators.required],
    },
    address: {
      value: '',
      transName: 'Heimadresse',
      valid: false,
      type: InputTypes.string,
      validator: [availableValidators.required],
    },
    country: {
      value: '',
      transName: 'Land',
      valid: false,
      type: InputTypes.string,
      validator: [availableValidators.required],
    },
    firstName: {
      value: '',
      transName: 'Vorname',
      valid: false,
      type: InputTypes.string,
      validator: [availableValidators.required],
    },
    lastName: {
      value: '',
      transName: 'Nachname',
      valid: false,
      type: InputTypes.string,
      validator: [availableValidators.required],
    },
    phoneNumber: {
      value: '',
      transName: 'Telefonnummer',
      valid: false,
      type: InputTypes.number,
      validator: [availableValidators.required],
    },
  },
  steps: [
    {
      stepFields: ['username', 'password', 'confirmPassword'],
      stepName: 'Login Daten',
      valid: false,
    },
    {
      stepFields: ['firstName', 'lastName', 'birthDay'],
      stepName: 'Persönliche Informationen',
      valid: false,
    },
    {
      stepFields: ['address', 'country', 'phoneNumber'],
      stepName: 'Adressen',
      valid: false,
    },
  ],
  selectedStep: 0,
};

export interface ShortStep {
  stepName: string;
  valid: boolean;
}
