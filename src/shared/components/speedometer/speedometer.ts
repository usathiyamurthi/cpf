import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, computed, signal, effect, viewChild, AfterViewInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-speedometer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './speedometer.html',
  styleUrls: ['./speedometer.scss']
})
export class SpeedometerComponent implements OnInit, OnChanges, AfterViewInit {
  private readonly svgContainer = viewChild<ElementRef<HTMLDivElement>>('svgContainer');
  private svg: d3.Selection<SVGSVGElement, unknown, null, undefined> | null = null;
  private initialized = false;

  // Inputs are backed by signals using setters so templates and computed values can react
  private _value = signal<number>(0);
  @Input()
  set value(v: number) { this._value.set(Number(v ?? 0)); }
  get value(): number { return this._value(); }

  private _minValue = signal<number>(0);
  @Input()
  set minValue(v: number) { this._minValue.set(Number(v ?? 0)); }
  get minValue(): number { return this._minValue(); }

  private _maxValue = signal<number>(100);
  @Input()
  set maxValue(v: number) { this._maxValue.set(Number(v ?? 100)); }
  get maxValue(): number { return this._maxValue(); }

  private _unit = signal<string>('');
  @Input()
  set unit(v: string) { this._unit.set(v ?? ''); }
  get unit(): string { return this._unit(); }

  private _label = signal<string>('');
  @Input()
  set label(v: string) { this._label.set(v ?? ''); }
  get label(): string { return this._label(); }

  private _size = signal<number>(250);
  @Input()
  set size(v: number) { this._size.set(Number(v ?? 250)); }
  get size(): number { return this._size(); }

  private _showValue = signal<boolean>(true);
  @Input()
  set showValue(v: boolean) { this._showValue.set(Boolean(v)); }
  get showValue(): boolean { return this._showValue(); }

  private _colorZones = signal<Array<{ from: number; to: number; color: string }>>([
    { from: 0, to: 33, color: '#ef4444' },
    { from: 33, to: 66, color: '#f59e0b' },
    { from: 66, to: 100, color: '#22c55e' }
  ]);
  @Input()
  set colorZones(v: Array<{ from: number; to: number; color: string }>) { this._colorZones.set(v ?? this._colorZones()); }
  get colorZones(): Array<{ from: number; to: number; color: string }> { return this._colorZones(); }

  constructor() {
    // Create an effect to redraw when any signal changes
    effect(() => {
      // Read all signals to register dependencies
      this._value();
      this._minValue();
      this._maxValue();
      this._size();
      this._colorZones();
      this._unit();
      this._label();
      this._showValue();

      // Only redraw if initialized
      if (this.initialized) {
        this.drawSpeedometer();
      }
    });
  }

  // Computed signals
  private readonly normalizedValue = computed(() => {
    const min = this._minValue();
    const max = this._maxValue();
    const raw = this._value();
    const clamped = Math.max(min, Math.min(max, raw));
    const range = Math.max(1, max - min);
    return ((clamped - min) / range) * 100;
  });

  readonly needleRotation = computed(() => {
    const normalized = this.normalizedValue();
    const angleRange = 180;
    const startAngle = -90;
    return startAngle + (normalized * angleRange / 100);
  });

  readonly displayValue = computed(() => this._value().toFixed(1));

  /* XXX Use this computation to determine arc color */
  readonly needleColor = computed(() => {
    const normalized = this.normalizedValue();
    for (const zone of this._colorZones()) {
      if (normalized >= zone.from && normalized <= zone.to) return zone.color;
    }
    return this._colorZones()[this._colorZones().length - 1]?.color || '#22c55e';
  });

  // Lifecycle hooks
  ngOnInit(): void {}
  
  ngOnChanges(_: SimpleChanges): void {}

  ngAfterViewInit(): void {
    this.initializeD3();
    this.initialized = true;
    this.drawSpeedometer();
  }

  private initializeD3(): void {
    const container = this.svgContainer()?.nativeElement;
    if (!container) return;

    // Clear any existing SVG
    d3.select(container).selectAll('*').remove();

    // Create SVG element
    this.svg = d3.select(container)
      .append('svg')
      .attr('class', 'speedometer-svg')
      .attr('width', this.size)
      .attr('height', this.size);
  }

  private drawSpeedometer(): void {
    if (!this.svg) return;

    const size = this._size();
    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size / 2 - 20;
    const arcWidth = 15;

    // Update SVG dimensions
    this.svg
      .attr('width', size)
      .attr('height', size);

    // Clear previous content
    this.svg.selectAll('g').remove();

    // Create main group
    const mainGroup = this.svg.append('g');

    // Draw outer arc

    const arcGenerator = d3.arc<any>()
        .innerRadius(radius - arcWidth / 2)
        .outerRadius(radius + arcWidth / 2)
        .startAngle((-90 - 0) * Math.PI / 180)
        .endAngle((90 - 0) * Math.PI / 180);

      mainGroup.append('path')
        .attr('d', arcGenerator as any)
        .attr('transform', `translate(${centerX}, ${centerY})`)
        .attr('fill', '#e5e7eb')


    // Draw color zones
    /* const colorZonesGroup = mainGroup.append('g').attr('class', 'color-zones');
    this._colorZones().forEach(zone => {
      const startAngle = -90 + (zone.from * 180 / 100);
      const endAngle = -90 + (zone.to * 180 / 100);
      const arcGenerator = d3.arc<any>()
        .innerRadius(radius - arcWidth / 2)
        .outerRadius(radius + arcWidth / 2)
        .startAngle((startAngle - 0) * Math.PI / 180)
        .endAngle((endAngle - 0) * Math.PI / 180);

      colorZonesGroup.append('path')
        .attr('d', arcGenerator as any)
        .attr('fill', zone.color)
        .attr('class', 'color-arc')
        .attr('transform', `translate(${centerX}, ${centerY})`);
    }); */

    // Draw tick marks and labels
    this.drawTickMarks(mainGroup, centerX, centerY, size);

    // Draw center hub
    mainGroup.append('circle')
      .attr('cx', centerX)
      .attr('cy', centerY)
      .attr('r', 4)
      .attr('class', 'center-hub');

    // Draw needle group
    const needleGroup = mainGroup.append('g')
      .attr('class', 'needle-group')
      .attr('transform', `translate(${centerX}, ${centerY})`);

    const needleLength = size / 2 - 50;
    const needleBaseWidth = 8; // Fat head
    const needleTipWidth = 1;  // Sharp tail
    
    // Create needle path (triangle/arrow shape)
    const needlePath = `
      M ${-needleBaseWidth / 2} 0
      L ${needleBaseWidth / 2} 0
      L ${needleTipWidth / 2} ${-needleLength}
      L ${-needleTipWidth / 2} ${-needleLength}
      Z
    `;

    // Needle
    needleGroup.append('path')
      .attr('d', needlePath)
      .attr('class', 'needle')
      .attr('stroke', '#4b5563')
      .attr('stroke-width', '0.5')
      .attr('transform', `rotate(-135)`)
      .transition()
      .duration(1500)
      .ease(d3.easeCubicOut)
      .attr('transform', `rotate(${this.needleRotation()})`);

    // Center cap
    mainGroup.append('circle')
      .attr('cx', centerX)
      .attr('cy', centerY)
      .attr('r', 3)
      .attr('stroke', '#fff')
      .attr('fill', '#fff')
      .attr('class', 'center-cap');
  }

  private drawTickMarks(group: d3.Selection<SVGGElement, unknown, null, undefined>, centerX: number, centerY: number, size: number): void {
    const ticksGroup = group.append('g').attr('class', 'tick-marks');

    const majorTickCount = 6;
    const angleRange = 180;
    const startAngle = -90;

    for (let i = 0; i < majorTickCount; i++) {
      const percentage = i / (majorTickCount - 1);
      const angle = startAngle + (percentage * angleRange);
      
      // Major tick
      const x1 = centerX + (size / 2 - 35) * Math.cos((angle - 90) * Math.PI / 180);
      const y1 = centerY + (size / 2 - 35) * Math.sin((angle - 90) * Math.PI / 180);
      const x2 = centerX + (size / 2 - 45) * Math.cos((angle - 90) * Math.PI / 180);
      const y2 = centerY + (size / 2 - 45) * Math.sin((angle - 90) * Math.PI / 180);

      ticksGroup.append('line')
        .attr('x1', x1)
        .attr('y1', y1)
        .attr('x2', x2)
        .attr('y2', y2)
        .attr('stroke', '#6b7280')
        .attr('class', 'tick-major');

    }
  }
}
