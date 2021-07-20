import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoElementEditorComponent } from './todo-element-editor.component';

describe('TodoElementEditorComponent', () => {
  let component: TodoElementEditorComponent;
  let fixture: ComponentFixture<TodoElementEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoElementEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoElementEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
