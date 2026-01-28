import { Component, OnInit, Input, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

@Component({
    selector: 'cpf-field-label',
    templateUrl: './field-label.component.html',
    styleUrls: ['./field-label.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CommonModule, TooltipModule]
})
export class FieldLabelComponent implements OnInit {
    @Input() text?: string;
    @Input() required?: boolean;
    @Input() showHelpIcon?: boolean;
    @Input() helpIconClass?: string;
    @Input() helpKey?: string;
    @Input() helpContent?: string;
    @Input() editable?: boolean;
    @Input() linkLabel?: string;

    @Output() showHelp = new EventEmitter<string>();
    @Output() addLabelLinkClick = new EventEmitter();

    constructor() { }

    ngOnInit() { }

    helpEvt() {
        if (!this.helpContent) {
            this.showHelp.emit(this.helpKey);
        }
    }
    
    public addLabelLinkEvent(){
        this.addLabelLinkClick.emit();
    }
}
