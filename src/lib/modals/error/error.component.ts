import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
    selector: 'cpf-model-error-component',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './error.component.html',
    encapsulation: ViewEncapsulation.None
})
export class ErrorComponent {
    public title: string = '';
    public msg: string = '';
    public details: string = '';
    public okLabel: string = 'OK';

    public showDetails: boolean = false;
    public okCallback() { this.bsModalRef.hide(); }
    constructor(public bsModalRef: BsModalRef) { }
}
