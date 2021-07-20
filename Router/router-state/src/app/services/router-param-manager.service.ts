import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RouterParamManagerService {
  constructor(private route: ActivatedRoute, private router: Router) {}

  updateState(todosToSave) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { todos: JSON.stringify(todosToSave) },
    });
  }

  readState(): Observable<any> {
    return this.route.queryParams.pipe(
      map((params) => (params.todos ? JSON.parse(params.todos) : null))
    );
  }
}
