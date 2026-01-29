import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Speedometer } from './speedometer';

describe('Speedometer', () => {
  let component: Speedometer;
  let fixture: ComponentFixture<Speedometer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Speedometer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Speedometer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
