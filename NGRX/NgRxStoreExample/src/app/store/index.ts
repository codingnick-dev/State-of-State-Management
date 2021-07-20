import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { FormState } from '../models/formState';
import { ReduxState } from '../models/reduxState';
import { FormReducer } from './reducers/formReducer';

export const reducers: ActionReducerMap<ReduxState> = {
  registerForm: FormReducer,
};
export const metaReducers: MetaReducer<ReduxState>[] = [];
