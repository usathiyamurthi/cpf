import { Injectable, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';

import { AlertComponent } from './alert/alert.component';
import { LoadingComponent } from './loading/loading.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { InformationComponent } from './information/information.component';
import { ErrorComponent } from './error/error.component';
import { SuccessComponent } from './success/success.component';
import { WarningComponent } from './warning/warning.component';

@Injectable({
    providedIn: 'root',
})
export class ModalDialogService {
    static readonly VALUE_STSTIC = 'static';
    public showAnimation: boolean = true;

    private defaultConfig: ModalOptions = {
        ignoreBackdropClick: true,
        keyboard: false,
        animated: true,
        backdrop: ModalDialogService.VALUE_STSTIC,
    };

    constructor(private bsModalService: BsModalService) {
        bsModalService.config.animated = this.showAnimation;
        bsModalService.config.class = 'cpf-modal modal-dialog-centered';
    }

    /**
     * @description
     *
     * Defines the simple alert with IModalAlertParams as parameter.
     * Will show only OK button and provides call back capabilities.
     *
     * Returns reference to the modal dialog box.
     * @publicApi
     */
    public alertDanger(iModalAlertParams: IModalAlertParams): BsModalRef {
        return this.bsModalService.show(AlertComponent, {
            animated: this.showAnimation,
            backdrop: ModalDialogService.VALUE_STSTIC,
            class: 'cpf-modal modal-dialog-centered cpf-modal-md iconDanger',
            initialState: {
                title: iModalAlertParams.title || '',
                msg: iModalAlertParams.msg,
                details: iModalAlertParams.details,
                okLabel: iModalAlertParams.okLabel || 'OK',
                okCallback: iModalAlertParams.okCallback,
                cancelCallback: iModalAlertParams.cancelCallback,
            },
            ...iModalAlertParams.params,
        });
    }

    public alertWarning(iModalAlertParams: IModalAlertParams): BsModalRef {
        return this.bsModalService.show(AlertComponent, {
            animated: this.showAnimation,
            backdrop: ModalDialogService.VALUE_STSTIC,
            class: 'cpf-modal modal-dialog-centered cpf-modal-md iconWarning',
            initialState: {
                title: iModalAlertParams.title || '',
                msg: iModalAlertParams.msg,
                details: iModalAlertParams.details,
                okLabel: iModalAlertParams.okLabel || 'OK',
                okCallback: iModalAlertParams.okCallback,
                cancelCallback: iModalAlertParams.cancelCallback,
            },
            ...iModalAlertParams.params,
        });
    }

    public alert(iModalAlertParams: IModalAlertParams): BsModalRef {
        return this.bsModalService.show(AlertComponent, {
            animated: this.showAnimation,
            backdrop: ModalDialogService.VALUE_STSTIC,
            class: 'cpf-modal modal-dialog-centered cpf-modal-md iconDanger',
            initialState: {
                title: iModalAlertParams.title || '',
                msg: iModalAlertParams.msg,
                details: iModalAlertParams.details,
                okLabel: iModalAlertParams.okLabel || 'OK',
                okCallback: iModalAlertParams.okCallback,
                cancelCallback: iModalAlertParams.cancelCallback,
            },
            ...iModalAlertParams.params,
        });
    }

    public info(iModalAlertParams: IModalAlertParams): BsModalRef {
        return this.bsModalService.show(InformationComponent, {
            animated: this.showAnimation,
            backdrop: ModalDialogService.VALUE_STSTIC,
            class: 'cpf-modal modal-dialog-centered cpf-modal-md',
            initialState: {
                title: iModalAlertParams.title || '',
                msg: iModalAlertParams.msg,
                details: iModalAlertParams.details,
                okLabel: iModalAlertParams.okLabel || 'OK',
                cancelLabel: iModalAlertParams.cancelLabel,
                okCallback: iModalAlertParams.okCallback,
                cancelCallback: iModalAlertParams.cancelCallback,
            },
            ...iModalAlertParams.params,
        });
    }

    public error(iModalAlertParams: IModalAlertParams): BsModalRef {
        return this.bsModalService.show(ErrorComponent, {
            animated: this.showAnimation,
            backdrop: ModalDialogService.VALUE_STSTIC,
            class: 'cpf-modal modal-dialog-centered cpf-modal-md',
            initialState: {
                title: iModalAlertParams.title || '',
                msg: iModalAlertParams.msg,
                details: iModalAlertParams.details,
                okLabel: iModalAlertParams.okLabel || 'OK',
                okCallback: iModalAlertParams.okCallback,
                cancelCallback: iModalAlertParams.cancelCallback,
            },
            ...iModalAlertParams.params,
        });
    }
    public warning(iModalAlertParams: IModalAlertParams): BsModalRef {
        return this.bsModalService.show(WarningComponent, {
            animated: this.showAnimation,
            backdrop: ModalDialogService.VALUE_STSTIC,
            class: 'cpf-modal modal-dialog-centered cpf-modal-md',
            initialState: {
                title: iModalAlertParams.title || '',
                msg: iModalAlertParams.msg,
                details: iModalAlertParams.details,
                okLabel: iModalAlertParams.okLabel || 'OK',
                cancelLabel: iModalAlertParams.cancelLabel,
                okCallback: iModalAlertParams.okCallback,
                cancelCallback: iModalAlertParams.cancelCallback,
            },
            ...iModalAlertParams.params,
        });
    }

    /**
     * @description
     *
     * Defines the simple loader for application show as an modal.
     * message to show on loader and Modal Options.
     *
     * Returns reference to the modal dialog box.
     * @publicApi
     */
    public loading(msg: string, params?: ModalOptions): BsModalRef {
        return this.bsModalService.show(LoadingComponent, {
            ...this.defaultConfig,
            class: 'cpf-modal modal-dialog-centered cpf-modal-sm',
            initialState: { msg: msg || '' },
            ...params,
        });
    }

    /**
     * @description
     *
     * Use this moethod to show custom component inside a modal window.
     * message to show on loader and Modal Options.
     * confirmLabel, cancelLabel, title can be customized using params
     * Returns reference to the modal dialog box.
     * @publicApi
     */
    modalComponent(
        component: any,
        confirmCallback: (data?: any) => void,
        cancelCallback?: () => void,
        params?: any
    ): BsModalRef {
        return this.bsModalService.show(component, {
            ...this.defaultConfig,
            class: 'cpf-modal modal-dialog-centered cpf-modal-sm',
            initialState: {
                data: params,
                title: params && params.title,
                confirmCallback,
                cancelCallback,
                confirmLabel: (params && params.confirmLabel) || 'Confirm',
                cancelLabel: (params && params.cancelLabel) || 'Cancel',
                bsModalRef: undefined,
            },
            ...params,
        });
    }

    /**
     * @description
     *
     * Use this moethod to show custom template inside a modal window.
     * Returns reference to the modal dialog box.
     * @publicApi
     */
    modalTemplate(template: TemplateRef<any>, params?: any): BsModalRef {
        const customClass: string = params && params.class ? params.class : 'customClass';
        const modalRef: BsModalRef = this.bsModalService.show(template, { class: customClass, ...params });
        return modalRef;
    }

    confirm(
        msg: string,
        confirmCallback: () => void,
        cancelCallback?: () => void,
        title?: string,
        confirmLabel?: string,
        cancelLabel?: string,
        iconClass?: string,
        params?: any,
      
    ): BsModalRef {
        return this.bsModalService.show(ConfirmComponent, {
            ...this.defaultConfig,
            class: 'cpf-modal modal-dialog-centered cpf-modal-md',
            ignoreBackdropClick: true,
            animated: this.showAnimation,
            initialState: {
                title: title || 'Confirm',
                confirmLabel: confirmLabel || 'Confirm',
                cancelLabel: cancelLabel || 'Cancel',
                msg,
                confirmCallback,
                cancelCallback,
                iconClass: iconClass || '',
            },
            ...params,
        });
    }

    success(
        msg: string,
        confirmCallback: () => void,
        cancelCallback?: () => void,
        title?: string,
        confirmLabel?: string,
        cancelLabel?: string,
        showCloseButton?: boolean,
        params?: any
    ): BsModalRef {
        return this.bsModalService.show(SuccessComponent, {
            ...this.defaultConfig,
            class: 'cpf-modal modal-dialog-centered cpf-modal-md',
            ignoreBackdropClick: true,
            animated: this.showAnimation,
            initialState: {
                title: title || 'Confirm',
                confirmLabel: confirmLabel || 'Confirm',
                cancelLabel,
                msg,
                confirmCallback,
                cancelCallback,
                showCloseButton: (showCloseButton === false) ? false : true,
            },
            ...params,
        });
    }
}

export interface IModalAlertParams {
    title: string;
    msg: string;
    details?: string;
    okLabel?: string;
    okCallback?: () => void;
    cancelCallback?: () => void;
    params?: ModalOptions;
    cancelLabel?: string;
}
