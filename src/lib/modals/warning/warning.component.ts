import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
    selector: 'cpf-model-warning-component',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './warning.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class WarningComponent {
    public title: string = '';
    public msg: string = '';
    public details: string = '';
    public okLabel: string = 'OK';
    public showDetails: boolean = false;
    public okCallback?: () => void;
    public cancelLabel?: string;
    public cancelCallback?: () => void;
    constructor(public bsModalRef: BsModalRef) {}

    public confirmClick() {
        if (this.okCallback) {
            this.okCallback();
        }
    }

    public cancelClick() {
        if (this.cancelCallback) {
            this.cancelCallback();
        }
        this.bsModalRef.hide();
    }
}
