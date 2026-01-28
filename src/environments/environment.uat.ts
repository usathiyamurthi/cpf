// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular.json`.

export const environment = {
  appEnv: 'uat',
  aiHome: 'https://aiuat.worldbank.org/',
  apiBaseUrl: 'https://aiuat.worldbank.org/api',
  appBaseUrl: 'https://aiuat.worldbank.org/apps',
  apiMaiAppsUrl: 'https://aiuat.worldbank.org/maiapps-api',
  apiAspireUrl: 'https://wbopenaiaspirepyuat.asestg.worldbank.org/apiv2',
  apiCcbUrl: 'https://aiuat.worldbank.org/maiapps-api/ccb',
  apiV1Url: 'https://aiuat.worldbank.org/apiv1',
  apiChatApi: 'https://aiuat.worldbank.org/apiv2',
  aspireApi: 'https://wbopenaibotpyv1uat.asestg.worldbank.org/mai-solutions-api/dnr-website',
  production: false,
  isB2CAuth: false,
  preferenceSecure: true,
  settings: {
    accessGroups: {
      generalAdminGroups: ['AIKP-Admin', 'ITSAI-DEV-Admin'],
      generalBotGroups: ['AIKP-Admin', 'ITSAI-DEV-Admin'],
    },
  },
  msalResources: [
    {
      resource: 'https://graph.microsoft.com/v1.0/me',
      scope: ['user.read'],
    },
    {
      resource: 'https://wbopenaiaspirepyuat.asestg.worldbank.org/',
      scope: ['1d6c586f-419f-4244-a5b4-23feebf6db93/.default'],
    },
    {
      resource: 'https://aiuat.worldbank.org/',
      scope: ['1d6c586f-419f-4244-a5b4-23feebf6db93/.default'],
    },
    {
      resource: 'https://wbopenaichatbotpyv1uat.asestg.worldbank.org/',
      scope: ['1d6c586f-419f-4244-a5b4-23feebf6db93/.default'],
    },
    {
      resource: 'https://wbopenaimaiappspyuat.asestg.worldbank.org/',
      scope: ['1d6c586f-419f-4244-a5b4-23feebf6db93/.default'],
    },
    {
      resource: 'https://wbopenaibotpyv1uat.asestg.worldbank.org/',
      scope: ['1d6c586f-419f-4244-a5b4-23feebf6db93/.default'],
    },
  ],
  msalConfig: {
    auth: {
      authority: 'https://login.microsoftonline.com/worldbank.org/',
      clientId: '20993577-7a99-43c9-926a-b5ccceee6a44',
      redirectUri: 'https://aiuat.worldbank.org/realoutcomes/',
      postLogoutRedirectUri: 'https://aiuat.worldbank.org/realoutcomes/',
      navigateToLoginRequestUrl: true,
    },
    b2cAuth: {
      authority: 'https://login.microsoftonline.com/worldbank.org/',
      clientId: '7bccd5cc-14b2-4d6c-949a-c133caeb8dd8',
      redirectUri: 'http://localhost:4200/',
      postLogoutRedirectUri: 'http://localhost:4200/',
      navigateToLoginRequestUrl: true,
    },
    cache: {
      cacheLocation: 'sessionStorage',
    },
    logs: false,
  },
  initialScope: '',
  appInsightsKey: '', // To be updated with the key from Azure portal
  appInsightsName: '', // To be updated with the name from Azure portal
  // MS Application Insights is transitioning to conncetionstring instead of instrumentation key. Going forward, this
  // will be mandatory to update along with instrumentation key!
  // Refer - https://docs.microsoft.com/en-us/azure/azure-monitor/app/sdk-connection-string?tabs=net
  // eslint-disable-next-line max-len
  connectionString: `InstrumentationKey=1b6d0912-f78d-408d-856e-f778f8e7f409;IngestionEndpoint=https://eastus-1.in.applicationinsights.azure.com/;LiveEndpoint=https://eastus.livediagnostics.monitor.azure.com/`,
};
