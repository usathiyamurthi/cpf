import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DimensionSection } from './dimension-section';

describe('DimensionSection', () => {
  let component: DimensionSection;
  let fixture: ComponentFixture<DimensionSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DimensionSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DimensionSection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
