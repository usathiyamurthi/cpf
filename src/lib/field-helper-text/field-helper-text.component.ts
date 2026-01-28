import { Component, OnInit, Input, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';


@Component({
    selector: 'cpf-field-helper-text',
    templateUrl: './field-helper-text.component.html',
    styleUrls: ['./field-helper-text.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CommonModule]
})
export class FieldHelperTextComponent implements OnInit {
    @Input() styleClass?: string;
    public _text: string = '';
    public _dispText: string = '';
    @Input() set text(text: string | undefined) {
        this._text = text || '';
        if (text !== null && text !== undefined) {
            this._dispText = text;
        }
    }
    get text() {
        return this.sanitizer.bypassSecurityTrustHtml(this._dispText || '') as string || '';
    }
    @Output() helperTextLinkClicked: EventEmitter<string> = new EventEmitter<string>();

    constructor(protected sanitizer: DomSanitizer) { }

    ngOnInit() { }

    public onHelperTextClick($event: Event): void {
        if ($event.target instanceof HTMLAnchorElement) {
            // emit the unique identifier id
            this.helperTextLinkClicked.emit($event.target.id);
        }
    }
}
