import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ConfirmComponent } from './modals/confirm/confirm.component';
import { ErrorComponent } from './modals/error/error.component';
import { InformationComponent } from './modals/information/information.component';
import { LoadingComponent } from './modals/loading/loading.component';
import { ModalDialogService } from './modals/modaldialog.service';
import { SectionLoaderComponent } from './modals/section-loader/section-loader.component';
import { SuccessComponent } from './modals/success/success.component';
import { WarningComponent } from './modals/warning/warning.component';
import { AlertComponent } from './modals/alert/alert.component';

@NgModule({
    imports: [
        CommonModule,
        ModalModule.forRoot(),
        AlertComponent,
        LoadingComponent,
        SectionLoaderComponent,
        ConfirmComponent,
        InformationComponent,
        ErrorComponent,
        SuccessComponent,
        WarningComponent,
    ],
    providers: [ModalDialogService],
    exports: [
        SectionLoaderComponent,
        AlertComponent,
        LoadingComponent,
        ConfirmComponent,
        InformationComponent,
        ErrorComponent,
        SuccessComponent,
        WarningComponent,
    ],
})
export class CpfModalDialogModule {}
