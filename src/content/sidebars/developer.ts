/**
 * https://starlight.astro.build/reference/configuration/#sidebaritem
 */
import { sidebarLabel } from '../../utils/i18n';

export default [
  {
    ...sidebarLabel('crowdinApps'),
    items: [
      { slug: path('crowdin-apps-about') },
      { slug: path('crowdin-apps-quick-start') },
      { slug: path('crowdin-apps-app-descriptor') },
      { slug: path('crowdin-apps-js') },
      { slug: path('crowdin-apps-installation') },
      { slug: path('crowdin-apps-security') },
      { slug: path('crowdin-apps-user-interface') },
      {
        ...sidebarLabel('publishing'),
        autogenerate: { directory: path('crowdin-apps', 'publishing') },
        collapsed: true,
      },
    ],
  },
  {
    ...sidebarLabel('modules'),
    items: [
      {
        ...sidebarLabel('uiModules'),
        autogenerate: { directory: path('modules', 'ui-modules') },
        collapsed: true,
      },
      {
        ...sidebarLabel('aiModules'),
        autogenerate: { directory: path('modules', 'ai-modules') },
        collapsed: true,
      },
      {
        ...sidebarLabel('fileProcessingModules'),
        autogenerate: { directory: path('modules', 'file-processing-modules') },
        collapsed: true,
      },
      {
        ...sidebarLabel('other'),
        autogenerate: { directory: path('modules', 'other') },
        collapsed: true,
      }
    ],
    collapsed: true,
  },
  {
    ...sidebarLabel('capabilities'),
    autogenerate: { directory: path('capabilities') },
    collapsed: true,
  },
  {
    ...sidebarLabel('api'),
    items: [
      {
        slug: path('api'),
        ...sidebarLabel('overview'),
      },
      {
        ...sidebarLabel('crowdinApiFileBased'),
        link: '/developer/api/v2/'
      },
      {
        ...sidebarLabel('crowdinApiStringBased'),
        link: '/developer/api/v2/string-based/'
      },
      {
        ...sidebarLabel('enterpriseApiFileBased'),
        link: '/developer/enterprise/api/v2/'
      },
      {
        ...sidebarLabel('enterpriseApiStringBased'),
        link: '/developer/enterprise/api/v2/string-based/'
      },
      { slug: path('graphql-api') },
      { slug: path('croql') },
      { slug: path('crowdin-mcp-server') },
      { slug: path('language-codes') },
    ],
    collapsed: true,
  },
  {
    ...sidebarLabel('devTools'),
    items: [
      {
        slug: path('dev-tools'),
        ...sidebarLabel('overview'),
      },
      {
        slug: path('configuration-file')
      },
      {
        ...sidebarLabel('consoleClientCli'),
        link: 'https://crowdin.github.io/crowdin-cli/',
        attrs: { target: '_blank' },
      },
      {
        ...sidebarLabel('githubAction'),
        link: 'https://github.com/marketplace/actions/crowdin-action',
        attrs: { target: '_blank' },
      },
      {
        ...sidebarLabel('visualStudioCodePlugin'),
        link: 'https://marketplace.visualstudio.com/items?itemName=Crowdin.vscode-crowdin',
        attrs: { target: '_blank' },
      },
      {
        ...sidebarLabel('androidStudioPlugin'),
        link: 'https://github.com/crowdin/android-studio-plugin#readme',
        attrs: { target: '_blank' },
      },
      {
        ...sidebarLabel('androidSdk'),
        link: 'https://crowdin.github.io/mobile-sdk-android/',
        attrs: { target: '_blank' },
      },
      {
        ...sidebarLabel('iosSdk'),
        link: 'https://crowdin.github.io/mobile-sdk-ios/',
        attrs: { target: '_blank' },
      },
      {
        ...sidebarLabel('websiteJsSdk'),
        link: 'https://crowdin.github.io/ota-client-js/',
        attrs: { target: '_blank' },
      },
        {
            ...sidebarLabel('flutterSdk'),
            link: 'https://github.com/crowdin/flutter-sdk#readme',
            attrs: { target: '_blank' },
        },
    ],
    collapsed: true,
  },
  {
    ...sidebarLabel('security'),
    autogenerate: { directory: path('security') },
    collapsed: true,
  },
  {
    ...sidebarLabel('guides'),
    autogenerate: { directory: path('guides') },
    collapsed: true,
  }
]

function path(...args: string[]) {
  return 'developer/' + args.join('/');
}
