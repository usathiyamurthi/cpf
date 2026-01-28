// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular.json`.

export const environment = {
  appEnv: 'qa',
  aiHome: 'https://aiqa.worldbank.org/',
  apiBaseUrl: 'https://aiqa.worldbank.org/api',
  appBaseUrl: 'https://aiqa.worldbank.org/apps',
  apiMaiAppsUrl: 'https://aiqa.worldbank.org/maiapps-api',
  apiCcbUrl: 'https://aiqa.worldbank.org/maiapps-api/ccb',
  apiAspireUrl: 'https://wbopenaiaspirepyqa.asestg.worldbank.org/apiv2',
  apiV1Url: 'https://aiqa.worldbank.org/apiv1',
  apiChatApi: 'https://aiqa.worldbank.org/apiv2',
  //aspireApi: 'https://aiqa.worldbank.org/aspire-api/dnr-website',
  aspireApi: 'https://wbopenaibotpyv1qa.asestg.worldbank.org/mai-solutions-api/dnr-website',
  scope: 'c626bd72-9ef7-4efe-9176-5c75800f7670/.default',
  apiV1UrlInfra: 'https://aiqa.worldbank.org/apiv1',

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
      resource: 'https://wbopenaiaspirepyqa.asestg.worldbank.org/',
      scope: ['c626bd72-9ef7-4efe-9176-5c75800f7670/.default'],
    },
    {
      resource: 'https://aiqa.worldbank.org/',
      scope: ['c626bd72-9ef7-4efe-9176-5c75800f7670/.default'],
    },
    {
      resource: 'https://wbopenaichatbotpyv1qa.asestg.worldbank.org/',
      scope: ['c626bd72-9ef7-4efe-9176-5c75800f7670/.default'],
    },
    {
      resource: 'https://wbopenaimaiappspyqa.asestg.worldbank.org/',
      scope: ['c626bd72-9ef7-4efe-9176-5c75800f7670/.default'],
    },
    {
      resource: 'https://wbopenaifeqa.asestg.worldbank.org',
      scope: ['c626bd72-9ef7-4efe-9176-5c75800f7670/.default'],
    },
    {
      resource: 'https://wbopenaibotpyv1qa.asestg.worldbank.org/',
      scope: ['c626bd72-9ef7-4efe-9176-5c75800f7670/.default'],
    },
  ],
  msalConfig: {
    auth: {
      authority: 'https://login.microsoftonline.com/worldbank.org/',
      clientId: '7bccd5cc-14b2-4d6c-949a-c133caeb8dd8',
      redirectUri: 'https://aiqa.worldbank.org/realoutcomes/',
      postLogoutRedirectUri: 'https://aiqa.worldbank.org/realoutcomes/',
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
