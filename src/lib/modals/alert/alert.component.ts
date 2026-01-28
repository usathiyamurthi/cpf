import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
    selector: 'cpf-modal-alert-component',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './alert.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class AlertComponent {
    public title: string = '';
    public msg: string = '';
    public details: string = '';
    public okLabel: string = 'OK';
    public cancelCallback?: () => void;
    public okCallback?: () => void;
    public showDetails: boolean = false;

    constructor(public bsModalRef: BsModalRef) {}

    public okClick() {
        if (this.okCallback) {
            this.okCallback();
        }
        this.bsModalRef.hide();
    }
    public closeClick() {
        if (this.cancelCallback) {
            this.cancelCallback();
        }
        this.bsModalRef.hide();
    }
}
