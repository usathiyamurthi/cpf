import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-circle-div',
  standalone: true,
  templateUrl: './circle-div.component.html',
  styleUrls: ['./circle-div.component.scss']
})
export class CircleDivComponent {
  @Input() data: string | number = 1;
@Input() color: string = '#c8f6c8';
@Input() borderColor: string = '#0b790b';
}
