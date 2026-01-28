import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'cpf-field-readonly',
  templateUrl: './field-readonly.component.html',
  styleUrls: ['./field-readonly.component.scss'],
  standalone: true,
  imports: [CommonModule]

})
export class FieldReadonlyComponent implements OnInit {
  @Input() value?: string;
  @Input() noValueText?: string;
  @Input() state?: string;
  @Input() showHelpforInputValue: boolean = false;
  @Input() IsSafeHtml: boolean = true;
  @Output() showInputValueHelp = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  helpEvt(key: any) {
    this.showInputValueHelp.emit(key);
}
}
