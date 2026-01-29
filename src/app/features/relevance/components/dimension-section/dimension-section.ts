import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card, DimensionCardData } from './card/card';

@Component({
  selector: 'app-dimension-section',
  imports: [CommonModule, Card],
  templateUrl: './dimension-section.html',
  styleUrl: './dimension-section.scss',
  standalone: true
})
export class DimensionSection {
  dimensions: DimensionCardData[] = [
    {
      icon: 'fa-bullseye',
      title: 'Relevance',
      description: 'Strategic alignment with objectives',
      value: 85,
      color: '#22c55e'
    },
    {
      icon: 'fa-check-circle',
      title: 'Effectiveness',
      description: 'Achievement of intended outcomes',
      value: 72,
      color: '#eab308'
    },
    {
      icon: 'fa-leaf',
      title: 'Sustainability',
      description: 'Long-term viability and impact',
      value: 68,
      color: '#10b981'
    },
    {
      icon: 'fa-gauge-high',
      title: 'Efficiency',
      description: 'Optimal use of resources',
      value: 90,
      color: '#22c55e'
    }
  ];
}
