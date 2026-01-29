import { Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { Home } from './features/components/home/home';
import { ColorCircleDemoComponent } from './color-circle-demo/color-circle-demo.component';
import { FileUploadDemoComponent } from './file-upload-demo/file-upload-demo.component';
import { ModalDemoComponent } from './modal-demo/modal-demo.component';
import { DimensionSection } from './features/relevance/components/dimension-section/dimension-section';

export const routes: Routes = [
  // { path: '', redirectTo: '/file-upload-demo', pathMatch: 'full' },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'modal-demo', component: ModalDemoComponent },
  { path: 'file-upload-demo', component: FileUploadDemoComponent, canActivate: [MsalGuard] },
  { path: 'color-circle-demo', component: ColorCircleDemoComponent },
  {path: 'dimension-section' , component : DimensionSection}
];
