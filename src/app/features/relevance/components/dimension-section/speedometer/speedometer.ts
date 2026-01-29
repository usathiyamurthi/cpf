import { Component, Input, OnInit, ElementRef, ViewChild, AfterViewInit, OnChanges } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-speedometer',
  imports: [],
  templateUrl: './speedometer.html',
  styleUrl: './speedometer.scss',
  standalone: true
})
export class Speedometer implements AfterViewInit, OnChanges {
  @Input() value: number = 0; // Value between 0 and 100
  @Input() color?: string;
  @ViewChild('gauge', { static: false }) gaugeRef!: ElementRef;

  ngAfterViewInit(): void {
    this.createSpeedometer();
  }

  ngOnChanges(): void {
    if (this.gaugeRef) {
      this.createSpeedometer();
    }
  }

  private createSpeedometer(): void {
    const element = this.gaugeRef.nativeElement;
    const width = 200;
    const height = 150;
    const radius = Math.min(width, height) / 2 - 10;

    // Clear any existing SVG
    d3.select(element).selectAll('*').remove();

    const svg = d3.select(element)
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('preserveAspectRatio', 'xMidYMid meet');

    const g = svg.append('g')
      .attr('transform', `translate(${width / 2}, ${height - 20})`);

    // Create gauge arc
    const arc = d3.arc()
      .innerRadius(radius - 20)
      .outerRadius(radius)
      .startAngle(-Math.PI / 2)
      .endAngle(Math.PI / 2);

    // Background arc
    g.append('path')
      .attr('d', arc as any)
      .attr('fill', '#e0e0e0');

    // Value arc
    const valueAngle = -Math.PI / 2 + (Math.PI * this.value / 100);
    const valueArc = d3.arc()
      .innerRadius(radius - 20)
      .outerRadius(radius)
      .startAngle(-Math.PI / 2)
      .endAngle(valueAngle);

    const gaugeColor = this.color || this.getColorForValue(this.value);
    
    g.append('path')
      .attr('d', valueArc as any)
      .attr('fill', gaugeColor);

    // Needle
    const needleLength = radius - 25;
    const needleAngle = valueAngle;
    const needleEnd = {
      x: needleLength * Math.cos(needleAngle),
      y: needleLength * Math.sin(needleAngle)
    };

    g.append('line')
      .attr('x1', 0)
      .attr('y1', 0)
      .attr('x2', needleEnd.x)
      .attr('y2', needleEnd.y)
      .attr('stroke', '#333')
      .attr('stroke-width', 2);

    // Center circle
    g.append('circle')
      .attr('cx', 0)
      .attr('cy', 0)
      .attr('r', 5)
      .attr('fill', '#333');

    // Value text
    g.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '-10')
      .attr('font-size', '24px')
      .attr('font-weight', 'bold')
      .attr('fill', gaugeColor)
      .text(`${this.value}%`);
  }

  private getColorForValue(value: number): string {
    if (value < 30) return '#ef4444'; // red
    if (value < 60) return '#f59e0b'; // orange
    if (value < 80) return '#eab308'; // yellow
    return '#22c55e'; // green
  }
}
