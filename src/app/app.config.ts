import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, RendererFactory2 } from '@angular/core';
import { BrowserModule, ɵDomRendererFactory2 as DomRendererFactory2 } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { ApiCallInterceptor, SpiDiagnosticsModule } from '@spi/diagnostics';
import { ModalModule } from 'ngx-bootstrap/modal';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { routes } from './app.routes';
import { MSAL_SERVICES } from './msal.config';
import { ENVIRONMENT_TOKEN } from '@spi/shared';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    importProvidersFrom(BrowserModule),
    importProvidersFrom(ModalModule.forRoot()),
    importProvidersFrom(SpiDiagnosticsModule.forRoot()),
    provideAnimations(),
    { provide: RendererFactory2, useExisting: DomRendererFactory2 },
    ...MSAL_SERVICES,
    { provide: HTTP_INTERCEPTORS, useClass: ApiCallInterceptor, multi: true },
    { provide: ENVIRONMENT_TOKEN, useValue: environment },
  ]
};
