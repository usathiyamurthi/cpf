import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-color-div',
  standalone: true,
  templateUrl: './color-div.component.html',
  styleUrls: ['./color-div.component.scss']
})
export class ColorDivComponent {
  @Input() color: string = '#c8f6c8'; // light green default
  @Input() borderColor: string = '#0b230b'; // default border color
  @Input() data: string = '';
}
