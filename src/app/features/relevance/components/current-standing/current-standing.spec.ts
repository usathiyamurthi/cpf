import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentStanding } from './current-standing';

describe('CurrentStanding', () => {
  let component: CurrentStanding;
  let fixture: ComponentFixture<CurrentStanding>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrentStanding]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentStanding);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
