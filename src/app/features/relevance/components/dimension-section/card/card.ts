import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Speedometer } from '../speedometer/speedometer';

export interface DimensionCardData {
  icon: string;
  title: string;
  description: string;
  value: number;
  color?: string;
}

@Component({
  selector: 'app-card',
  imports: [CommonModule, Speedometer],
  templateUrl: './card.html',
  styleUrl: './card.scss',
  standalone: true
})
export class Card {
  @Input() data!: DimensionCardData;
}
