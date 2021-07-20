import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { element } from 'protractor';
import { ElementType } from '../todo-list/todo-list.component';

@Component({
  selector: 'app-todo-element-editor',
  templateUrl: './todo-element-editor.component.html',
  styleUrls: ['./todo-element-editor.component.scss'],
})
export class TodoElementEditorComponent implements OnInit {
  @Input('element') element: ElementType;
  @Output('saveTodo') saveTodo = new EventEmitter<ElementType>();

  constructor() {}

  ngOnInit(): void {}

  saveClick() {
    this.saveTodo.emit(this.element);
  }
}
