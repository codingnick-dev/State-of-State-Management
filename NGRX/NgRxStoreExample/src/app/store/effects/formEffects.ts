import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { filter, mergeMap } from 'rxjs/operators';
import {
  revalidateField,
  updateField,
  validateStep,
} from '../actions/formActions';

@Injectable()
export class FormEffects {
  constructor(private action$: Actions) {}

  validateStep$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(updateField.type),
      mergeMap((action) => of(validateStep()))
    )
  );

  revalidateField$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(revalidateField.type),
      mergeMap((action: { type: string; key: string }) =>
        of(updateField({ update: { key: action.key, renew: true } }))
      )
    )
  );
}