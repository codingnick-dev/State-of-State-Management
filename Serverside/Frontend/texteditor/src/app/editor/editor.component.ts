import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ServersideService } from '../services/statemanagement/serverside.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent {
  @Output() changeText = new EventEmitter();
  @Output() undo = new EventEmitter();
  @Input() textArea: string | null = '';

  textEdit(change: any) {
    this.changeText.emit(change);
  }

  undoStep(keypress: Event) {
    keypress.preventDefault();
    this.undo.emit();
  }
}
