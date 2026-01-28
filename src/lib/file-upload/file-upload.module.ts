import { NgModule } from '@angular/core';
import { FileUploadComponent } from './file-upload.component';
import { DragDropDirective } from './drag-drop-directive';
import { FileSelectDirective } from './file-select.directive';

@NgModule({
    imports: [
        FileUploadComponent,
        DragDropDirective,
        FileSelectDirective
    ],
    exports: [
        DragDropDirective,
        FileSelectDirective,
        FileUploadComponent
    ]
})
export class FileUploadModule { }
