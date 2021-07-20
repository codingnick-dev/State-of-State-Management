import { Address } from './address';

export type AddressState = {
  delivery: Address;
  billing: Address;
  syncAddress: boolean;
};

export const initalState: AddressState = {
  delivery: {
    city: '',
    firstName: '',
    lastName: '',
    postalCode: null,
    street: '',
    streetNo: null,
  },
  billing: {
    city: '',
    firstName: '',
    lastName: '',
    postalCode: null,
    street: '',
    streetNo: null,
  },
  syncAddress: true,
};
