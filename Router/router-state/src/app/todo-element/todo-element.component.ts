import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ElementType } from '../todo-list/todo-list.component';

@Component({
  selector: 'app-todo-element',
  templateUrl: './todo-element.component.html',
  styleUrls: ['./todo-element.component.scss'],
})
export class TodoElementComponent {
  @Input('element') element: ElementType;
  @Output() checkedChange: EventEmitter<{
    id: number;
    value: boolean;
  }> = new EventEmitter<{ id: number; value: boolean }>();
  @Output() editElement: EventEmitter<number> = new EventEmitter<number>();
  @Output() deleteElement: EventEmitter<number> = new EventEmitter<number>();

  constructor() {}

  checkBoxClick(event) {
    this.checkedChange.emit({ id: this.element.id, value: event });
  }

  editClick() {
    this.editElement.emit(this.element.id);
  }

  deleteClick() {
    this.deleteElement.emit(this.element.id);
  }
}
