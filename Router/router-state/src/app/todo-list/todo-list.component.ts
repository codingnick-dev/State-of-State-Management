import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RouterParamManagerService } from '../services/router-param-manager.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent {
  nextId = 1;
  name: Observable<string>;
  todoItems: ElementType[] = [
    { id: 1, checked: true, text: 'Liste erstellen' },
    { id: 2, checked: true, text: 'Ersten Punkt abhaken' },
    { id: 3, checked: true, text: 'die beiden Haken abhaken' },
    { id: 4, checked: false, text: 'Feierabend machen' },
  ];
  newElementTemplate: ElementType = { id: null, checked: false, text: '' };
  editedEntry = null;
  highlighting = true;

  constructor(
    private routerParamManagerService: RouterParamManagerService,
    private route: ActivatedRoute
  ) {
    this.name = this.route.params.pipe(map((state) => state['name']));
    this.routerParamManagerService.readState().subscribe((state) => {
      if (state?.todos) {
        this.todoItems = state.todos;
        this.editedEntry = state.editedEntry;
      }
    });
    this.todoItems.forEach((element) => {
      if (this.nextId <= element.id) {
        this.nextId = element.id + 1;
      }
    });
  }

  saveFullState() {
    this.routerParamManagerService.updateState({
      todos: this.todoItems,
      editedEntry: this.editedEntry,
    });
  }

  checkState(element: { id: number; value: boolean }) {
    console.log(element);
    this.todoItems.find((item) => item.id === element.id).checked =
      element.value;
    this.saveFullState();
  }

  editTodo(id: number) {
    this.editedEntry = JSON.parse(
      JSON.stringify(this.todoItems.find((item) => item.id === id))
    );
    this.saveFullState();
  }

  openNewTodo() {
    let templateCopy = JSON.parse(JSON.stringify(this.newElementTemplate));
    templateCopy.id = this.nextId;
    this.editedEntry = templateCopy;
    this.saveFullState();
  }

  saveTodo(element: ElementType) {
    console.log(element);
    let replaced = false;
    this.todoItems = this.todoItems.map((item) => {
      if (item.id === element.id) {
        replaced = true;
        return element;
      }
      return item;
    });
    if (!replaced) {
      this.todoItems.push(this.editedEntry);
      this.nextId++;
    }
    this.editedEntry = null;
    this.saveFullState();
  }

  deleteTodo(id: number) {
    this.todoItems = this.todoItems.filter((item) => {
      if (item.id === id) {
        return false;
      }
      return true;
    });
    this.saveFullState();
  }
}

export type ElementType = {
  id: number;
  checked: boolean;
  text: string;
};
