import { Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { ColorCircleDemoComponent } from './color-circle-demo/color-circle-demo.component';
import { FileUploadDemoComponent } from './file-upload-demo/file-upload-demo.component';
import { ModalDemoComponent } from './modal-demo/modal-demo.component';
import { DimensionSection } from './features/relevance/components/dimension-section/dimension-section';

export const routes: Routes = [
  { path: '', redirectTo: '/file-upload-demo', pathMatch: 'full' },
  { path: 'modal-demo', component: ModalDemoComponent },
  { path: 'file-upload-demo', component: FileUploadDemoComponent, canActivate: [MsalGuard] },
  { path: 'color-circle-demo', component: ColorCircleDemoComponent },
  {path: 'dimension-section' , component : DimensionSection}
];
