export const environment = {
  appEnv: 'dev',
  apiMaiAppsUrl: 'https://aiqa.worldbank.org/maiapps-api',
  production: true,
  preferenceSecure: true,
  isB2CAuth: false,
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
  ],
  msalConfig: {
    auth: {
      authority: 'https://login.microsoftonline.com/tstad.worldbank.org/',
      clientId: '2bceee43-6513-4ff8-bb2b-41334fd36a28',
      redirectUri: 'http://coreframeworkdev.worldbank.org',
      postLogoutRedirectUri: 'https://worldbank.org',
      navigateToLoginRequestUrl: true,
    },
    b2cAuth: {
      clientId: '24423560-e5db-4550-b0e2-9e2b56f8a1cd',
      authority:
        'https://login.worldbankgroup.org/worldbankgroupb2c.onmicrosoft.com/b2c_1_susi',
      redirectUri: 'http://localhost:4200',
      postLogoutRedirectUri: 'https://www.worldbank.org',
      knownAuthorities: ['login.worldbankgroup.org'],
    },
    cache: {
      cacheLocation: 'sessionStorage',
    },
    logs: false,
  },
  initialScope: 'user.read',
  appInsightsKey: '', // To be updated with the key from Azure portal
  appInsightsName: '', // To be updated with the name from Azure portal
  // MS Application Insights is transitioning to conncetionstring instead of instrumentation key. Going forward, this
  // will be mandatory to update along with instrumentation key!
  // Refer - https://docs.microsoft.com/en-us/azure/azure-monitor/app/sdk-connection-string?tabs=net
  connectionString: `InstrumentationKey=1b6d0912-f78d-408d-856e-f778f8e7f409;
  IngestionEndpoint=https://eastus-1.in.applicationinsights.azure.com/;LiveEndpoint=https://eastus.livediagnostics.monitor.azure.com/`,
};
