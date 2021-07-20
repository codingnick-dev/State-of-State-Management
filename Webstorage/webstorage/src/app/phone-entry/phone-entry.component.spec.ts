import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneEntryComponent } from './phone-entry.component';

describe('PhoneEntryComponent', () => {
  let component: PhoneEntryComponent;
  let fixture: ComponentFixture<PhoneEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhoneEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
