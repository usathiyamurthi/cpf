import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpeedometerComponent } from './speedometer';

describe('SpeedometerComponent', () => {
  let component: SpeedometerComponent;
  let fixture: ComponentFixture<SpeedometerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpeedometerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpeedometerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default values', () => {
    expect(component.value).toBe(0);
    expect(component.minValue).toBe(0);
    expect(component.maxValue).toBe(100);
    expect(component.size).toBe(200);
    expect(component.showValue).toBe(true);
  });

  it('should calculate needle rotation correctly', () => {
    component.value = 50;
    component.minValue = 0;
    component.maxValue = 100;
  
    // At 50%, needle should be at 0° (center)
    expect(component.needleRotation()).toBeCloseTo(0);
  });

  it('should calculate needle rotation for min value', () => {
    component.value = 0;
    component.minValue = 0;
    component.maxValue = 100;
  
    // At 0%, needle should be at -135°
    expect(component.needleRotation()).toBeCloseTo(-135);
  });

  it('should calculate needle rotation for max value', () => {
    component.value = 100;
    component.minValue = 0;
    component.maxValue = 100;
  
    // At 100%, needle should be at 135°
    expect(component.needleRotation()).toBeCloseTo(135);
  });

  it('should clamp values outside range', () => {
    component.value = 150;
    component.minValue = 0;
    component.maxValue = 100;
  
    // Should clamp to max (100)
    expect(component.needleRotation()).toBeCloseTo(135);
  });

  it('should handle negative values', () => {
    component.value = -10;
    component.minValue = 0;
    component.maxValue = 100;
  
    // Should clamp to min (0)
    expect(component.needleRotation()).toBeCloseTo(-135);
  });

  it('should return correct color for value', () => {
    component.colorZones = [
      { from: 0, to: 33, color: '#ef4444' },
      { from: 33, to: 66, color: '#f59e0b' },
      { from: 66, to: 100, color: '#22c55e' }
    ];

    component.value = 20;
    expect(component.needleColor()).toBe('#ef4444');
    component.value = 50;
    expect(component.needleColor()).toBe('#f59e0b');
    component.value = 80;
    expect(component.needleColor()).toBe('#22c55e');
  });

  it('should format display value', () => {
    component.value = 75.456;
    expect(component.displayValue()).toBe('75.5');
  });

  it('should generate tick marks', () => {
    const ticks = component.tickMarks();
    expect(ticks.length).toBeGreaterThan(0);
  
    // Check that major ticks exist
    const majorTicks = ticks.filter((t: any) => t.isMajor);
    expect(majorTicks.length).toBe(11); // 0-100 with 10% intervals
  
    // Check that minor ticks exist
    const minorTicks = ticks.filter((t: any) => !t.isMajor);
    expect(minorTicks.length).toBeGreaterThan(0);
  });

  it('should generate color arcs', () => {
    component.colorZones = [
      { from: 0, to: 50, color: '#ef4444' },
      { from: 50, to: 100, color: '#22c55e' }
    ];
    component.size = 200;
  
    const arcs = component.colorArcs();
    expect(arcs.length).toBe(2);
    expect(arcs[0].color).toBe('#ef4444');
    expect(arcs[1].color).toBe('#22c55e');
  });

  it('should update needle on value change', () => {
    component.value = 25;
  
    // At 25%, needle should be at -67.5°
    expect(component.needleRotation()).toBeCloseTo(-67.5);
  });

  it('should handle custom min and max values', () => {
    component.value = 500;
    component.minValue = 0;
    component.maxValue = 1000;
  
    // At 50% of custom range, needle should be at 0°
    expect(component.needleRotation()).toBeCloseTo(0);
  });
});
