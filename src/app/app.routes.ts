import { Routes } from '@angular/router';
import { ModalDemoComponent } from './modal-demo/modal-demo.component';
import { FileUploadDemoComponent } from './file-upload-demo/file-upload-demo.component';
import { ColorCircleDemoComponent } from './color-circle-demo/color-circle-demo.component';

export const routes: Routes = [
  { path: '', redirectTo: '/file-upload-demo', pathMatch: 'full' },
  { path: 'modal-demo', component: ModalDemoComponent },
  { path: 'file-upload-demo', component: FileUploadDemoComponent },
  { path: 'color-circle-demo', component: ColorCircleDemoComponent },
];
