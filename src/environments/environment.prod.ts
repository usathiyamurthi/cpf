// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular.json`.

export const environment = {
  appEnv: 'prod',
  aiHome: 'https://ai.worldbank.org/',
  apiBaseUrl: 'https://ai.worldbank.org/api',
  appBaseUrl: 'https://ai.worldbank.org/apps',
  apiMaiAppsUrl: 'https://wbopenaimaiappspyprod.ase.worldbank.org/maiapps-api',
  apiAspireUrl: 'https://wbopenaiaspirepyprd.ase.worldbank.org/apiv2',
  apiCcbUrl: 'https://wbopenaimaiappspyprod.ase.worldbank.org/maiapps-api/ccb',
  apiV1Url: 'https://ai.worldbank.org/apiv1',
  apiChatApi: 'https://ai.worldbank.org/apiv2',
  aspireApi: 'https://wbopenaibotpyv1prod.ase.worldbank.org/mai-solutions-api/dnr-website',
  production: false,
  isB2CAuth: false,
  preferenceSecure: true,
  settings: {
    accessGroups: {
      generalAdminGroups: ['AIKP-Admin'],
      generalBotGroups: ['AIKP-Admin', 'ITSAI-DEV-Admin'],
    },
  },
  msalResources: [
    {
      resource: 'https://graph.microsoft.com/v1.0/me',
      scope: ['user.read'],
    },
    {
      resource: 'https://wbopenaiaspirepyprd.ase.worldbank.org/',
      scope: ['0b3b356c-4b5f-4d5b-97ad-c99343ad5557/.default'],
    },
    {
      resource: 'https://wbopenaimaiappspyprod.ase.worldbank.org/',
      scope: ['0b3b356c-4b5f-4d5b-97ad-c99343ad5557/.default'],
    },
    {
      resource: 'https://ai.worldbank.org/',
      scope: ['0b3b356c-4b5f-4d5b-97ad-c99343ad5557/.default'],
    },
    {
      resource: 'https://wbopenaichatbotpyv1.asestg.worldbank.org/',
      scope: ['0b3b356c-4b5f-4d5b-97ad-c99343ad5557/.default'],
    },
    {
      resource:
        'https://wbopenaimaiappspyprod.ocappsase.appserviceenvironment.net/',
      scope: ['0b3b356c-4b5f-4d5b-97ad-c99343ad5557/.default'],
    },
    {
      resource:
        'https://wbopenaibotpyv1prod.ase.worldbank.org/',
      scope: ['0b3b356c-4b5f-4d5b-97ad-c99343ad5557/.default'],
    },
  ],
  msalConfig: {
    auth: {
      authority: 'https://login.microsoftonline.com/worldbank.org/',
      clientId: '82459c94-7d05-4cb4-b35b-4289a4399335',
      redirectUri: 'https://ai.worldbank.org/realoutcomes/',
      postLogoutRedirectUri: 'https://ai.worldbank.org/realoutcomes/',
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
