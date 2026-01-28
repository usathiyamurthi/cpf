import { Component } from '@angular/core';
import { ColorDivComponent } from '../../lib/color-div/color-div.component';
import { CircleDivComponent } from '../../lib/circle-div/circle-div.component';
import { TabViewComponent } from '../../lib/tab-view/tab-view.component';

@Component({
  selector: 'app-color-circle-demo',
  standalone: true,
  imports: [ColorDivComponent, CircleDivComponent, TabViewComponent],
  templateUrl: './color-circle-demo.component.html',
  styleUrls: ['./color-circle-demo.component.scss']
})
export class ColorCircleDemoComponent {
  colorValue = '#90ee90';
  colorText = 'This is a colored div!';
  circleValue = 5;
  tabLabels = ['Alpha', 'Beta', 'Gamma'];
  tabData = ['Alpha content', 'Beta content', 'Gamma content'];
}
