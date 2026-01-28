import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldReadonlyComponent } from './field-readonly.component';

describe('FieldReadonlyComponent', () => {
  let component: FieldReadonlyComponent;
  let fixture: ComponentFixture<FieldReadonlyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldReadonlyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldReadonlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
