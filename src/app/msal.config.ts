import {
  MsalService,
  MSAL_INSTANCE,
  MsalGuard,
  MsalInterceptor,
  MsalBroadcastService,
  MSAL_GUARD_CONFIG,
  MSAL_INTERCEPTOR_CONFIG,
  MsalGuardConfiguration,
  MsalInterceptorConfiguration
} from '@azure/msal-angular';
import { IPublicClientApplication, PublicClientApplication, InteractionType, LogLevel } from '@azure/msal-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { environment } from '../environments/environment';

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function msalInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: environment.isB2CAuth ? environment.msalConfig.b2cAuth : environment.msalConfig.auth,
    cache: environment.msalConfig.cache,
    system: {
      loggerOptions: {
        loggerCallback: (level: LogLevel, message: string): void => {
          if (!environment.msalConfig.logs) {
            return;
          }
          // eslint-disable-next-line no-console
          console.log(message);
        },
        logLevel: LogLevel.Verbose,
        piiLoggingEnabled: false
      }
    }
  });
}

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function msalInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  environment.msalResources.forEach((resources : any)  => {
    protectedResourceMap.set(resources.resource, resources.scope);
  });
  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap
  };
}

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function msalGuardConfigFactory(): MsalGuardConfiguration {
  return { interactionType: InteractionType.Redirect, loginFailedRoute: 'error' };
}

export const MSAL_SERVICES = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: MsalInterceptor,
    multi: true
  },
  {
    provide: MSAL_INSTANCE,
    useFactory: msalInstanceFactory
  },
  {
    provide: MSAL_GUARD_CONFIG,
    useFactory: msalGuardConfigFactory
  },
  {
    provide: MSAL_INTERCEPTOR_CONFIG,
    useFactory: msalInterceptorConfigFactory
  },
  MsalService,
  MsalGuard,
  MsalBroadcastService
];
