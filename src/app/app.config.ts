import { ApplicationConfig, provideBrowserGlobalErrorListeners, importProvidersFrom } from '@angular/core';
import { ɵDomRendererFactory2 as DomRendererFactory2 } from '@angular/platform-browser';
import { ModalModule } from 'ngx-bootstrap/modal';
import { provideAnimations } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { RendererFactory2 } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    importProvidersFrom(BrowserModule),
    importProvidersFrom(ModalModule.forRoot()),
    provideAnimations(),
    { provide: RendererFactory2, useExisting: DomRendererFactory2 }
  ]
};
