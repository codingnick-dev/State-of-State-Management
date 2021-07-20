import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPageManagerComponent } from './form-page-manager.component';

describe('FormPageManagerComponent', () => {
  let component: FormPageManagerComponent;
  let fixture: ComponentFixture<FormPageManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormPageManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPageManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
