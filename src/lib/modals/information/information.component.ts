import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
    selector: 'cpf-model-information-component',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './information.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class InformationComponent {
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
