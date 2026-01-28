import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
    selector: 'cpf-model-success',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './success.component.html'
})
export class SuccessComponent {

    title: string = 'Successs';
    msg: string = '';

    confirmLabel: string = 'Confirm';
    cancelLabel?: string;
    confirmCallback?: () => void;
    cancelCallback?: () => void;
    showCloseButton: boolean = true;

    constructor(public bsModalRef: BsModalRef) { }

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
