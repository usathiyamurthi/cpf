import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-tab-view',
  standalone: true,
  templateUrl: './tab-view.component.html',
  styleUrls: ['./tab-view.component.scss']
})
export class TabViewComponent {
  @Input() tabs: string[] = ['Tab 1', 'Tab 2', 'Tab 3'];
  @Input() data: any[] = [];
  selectedIndex = 0;

  getTabData(index: number) {
    return this.data[index] || 'Dummy data for ' + (this.tabs[index] || ('Tab ' + (index + 1)));
  }

  selectTab(index: number) {
    this.selectedIndex = index;
  }
}
