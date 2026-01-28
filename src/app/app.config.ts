import { ApplicationConfig, provideBrowserGlobalErrorListeners, importProvidersFrom } from '@angular/core';
import { ɵDomRendererFactory2 as DomRendererFactory2 } from '@angular/platform-browser';
import { ModalModule } from 'ngx-bootstrap/modal';
import { provideAnimations } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { RendererFactory2 } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { routes } from './app.routes';
import { MSAL_SERVICES } from './msal.config';
import { ApiCallInterceptor, SpiDiagnosticsModule } from '@spi/diagnostics';
import { SpiSharedModule } from '@spi/shared';
import { ENVIRONMENT_TOKEN } from '@spi/shared';
import { environment } from '@env/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    importProvidersFrom(BrowserModule),
    importProvidersFrom(ModalModule.forRoot()),
    importProvidersFrom(SpiDiagnosticsModule.forRoot()),
    importProvidersFrom(SpiSharedModule.forRoot()),
    provideAnimations(),
    { provide: RendererFactory2, useExisting: DomRendererFactory2 },
    // MSAL providers configured via `src/app/msal.config.ts`
    ...MSAL_SERVICES,
    { provide: HTTP_INTERCEPTORS, useClass: ApiCallInterceptor, multi: true },
    {provide: ENVIRONMENT_TOKEN, useValue: environment}
  ]
};
