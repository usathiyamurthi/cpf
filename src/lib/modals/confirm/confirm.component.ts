import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
    selector: 'cpf-model-confirm',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './confirm.component.html',
    styleUrls: ['./confirm.component.scss'],
})
export class ConfirmComponent {
    title: string = 'Confirm';
    msg: string = '';
    iconClass: string = '';
    confirmLabel: string = 'Confirm';
    cancelLabel: string = 'Cancel';
    confirmCallback?: () => void;
    cancelCallback?: () => void;

    constructor(public bsModalRef: BsModalRef) {}

    confirmClick() {
        if (this.confirmCallback) {
            this.confirmCallback();
        }
    }

    cancelClick() {
        if (this.cancelCallback) {
            this.cancelCallback();
        }
        this.bsModalRef.hide();
    }
}
