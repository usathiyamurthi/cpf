// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular.json`.

export const environment = {
  appEnv: 'local',
  aiHome: 'https://aiqa.worldbank.org/',
  appBaseUrl: 'https://aiqa.worldbank.org/apps',
  apiBaseUrl: 'https://aiqa.worldbank.org/api',


  apiMaiAppsUrl: 'https://aiqa.worldbank.org/maiapps-api',
  apiCcbUrl: 'https://aiqa.worldbank.org/maiapps-api/ccb',
  apiAspireUrl: 'https://wbopenaiaspirepyqa.asestg.worldbank.org/apiv2',
  apiV1Url: 'https://aiqa.worldbank.org/apiv1',
  apiChatApi: 'https://aiqa.worldbank.org/apiv2',
  // aspireApi: 'https://aiqa.worldbank.org/aspire-api/dnr-website',
  // aspireApi: 'http://127.0.0.1:8000/aspire-api/dnr-website',
  aspireApi: 'https://wbopenaibotpyv1qa.asestg.worldbank.org/mai-solutions-api/dnr-website',
  


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
      resource: 'https://wbopenaimaiappspyqa.asestg.worldbank.org/',
      scope: ['c626bd72-9ef7-4efe-9176-5c75800f7670/.default'],
    },
    {
      resource: 'https://wbopenaibotpyv1prod.ase.worldbank.org/',
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
      redirectUri: 'http://localhost:4200/',
      postLogoutRedirectUri: 'http://localhost:4200/',
      navigateToLoginRequestUrl: true,
      cloudDiscoveryMetadata: `{"tenant_discovery_endpoint":"https://login.microsoftonline.com/worldbank.org/v2.0/.well-known/openid-configuration","api-version":"1.1","metadata":[{"preferred_network":"login.microsoftonline.com","preferred_cache":"login.windows.net","aliases":["login.microsoftonline.com","login.windows.net","login.microsoft.com","sts.windows.net"]},{"preferred_network":"login.partner.microsoftonline.cn","preferred_cache":"login.partner.microsoftonline.cn","aliases":["login.partner.microsoftonline.cn","login.chinacloudapi.cn"]},{"preferred_network":"login.microsoftonline.de","preferred_cache":"login.microsoftonline.de","aliases":["login.microsoftonline.de"]},{"preferred_network":"login.microsoftonline.us","preferred_cache":"login.microsoftonline.us","aliases":["login.microsoftonline.us","login.usgovcloudapi.net"]},{"preferred_network":"login-us.microsoftonline.com","preferred_cache":"login-us.microsoftonline.com","aliases":["login-us.microsoftonline.com"]}]}`,
      authorityMetadata: `{"token_endpoint":"https://login.microsoftonline.com/31a2fec0-266b-4c67-b56e-2796d8f59c36/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/31a2fec0-266b-4c67-b56e-2796d8f59c36/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/31a2fec0-266b-4c67-b56e-2796d8f59c36/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/31a2fec0-266b-4c67-b56e-2796d8f59c36/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/31a2fec0-266b-4c67-b56e-2796d8f59c36/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/31a2fec0-266b-4c67-b56e-2796d8f59c36/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"kerberos_endpoint":"https://login.microsoftonline.com/31a2fec0-266b-4c67-b56e-2796d8f59c36/kerberos","tenant_region_scope":"NA","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}`,
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
