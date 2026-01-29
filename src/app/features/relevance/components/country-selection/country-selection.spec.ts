import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountrySelection } from './country-selection';

describe('CountrySelection', () => {
  let component: CountrySelection;
  let fixture: ComponentFixture<CountrySelection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountrySelection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountrySelection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
