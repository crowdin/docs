/**
 * https://starlight.astro.build/reference/configuration/#sidebaritem
 */
export default [
  {
    label: 'Crowdin Apps',
    items: [
      { slug: path('crowdin-apps-about') },
      { slug: path('quick-start') },
      { slug: path('crowdin-apps-app-descriptor') },
      { slug: path('crowdin-apps-js') },
      { slug: path('crowdin-apps-installation') },
      { slug: path('crowdin-apps-security') },
      { slug: path('crowdin-apps-ui-kit') },
      {
        label: 'Publishing',
        autogenerate: { directory: path('crowdin-apps', 'publishing') },
        collapsed: true,
      },
    ],
  },
  {
    label: 'Modules',
    items: [
      {
        label: 'UI Modules',
        autogenerate: { directory: path('modules', 'ui-modules') },
        collapsed: true,
      },
      {
        label: 'File Processing Modules',
        autogenerate: { directory: path('modules', 'file-processing-modules') },
        collapsed: true,
      },
      {
        label: 'Other',
        autogenerate: { directory: path('modules', 'other') },
        collapsed: true,
      }
    ],
    collapsed: true,
  },
  {
    label: 'Capabilities',
    autogenerate: { directory: path('capabilities') },
    collapsed: true,
  },
  {
    label: 'API',
    items: [
      {
        label: 'Crowdin API (File-based)',
        link: 'developer/api/v2'
      },
      {
        label: 'Crowdin API (String-based)',
        link: 'developer/api/v2/string-based'
      },
      {
        label: 'Enterprise API (File-based)',
        link: 'developer/enterprise/api/v2'
      },
      {
        label: 'Enterprise API (String-based)',
        link: 'developer/enterprise/api/v2/string-based'
      },
      { slug: path('graphql-api') },
      { slug: path('croql') },
      { slug: path('api-clients') },
      { slug: path('language-codes') },
    ],
    collapsed: true,
  },
  {
    label: 'Dev Tools',
    items: [
      {
        slug: path('configuration-file')
      },
      {
        label: 'Console Client (CLI)',
        link: 'https://crowdin.github.io/crowdin-cli/',
        attrs: { target: '_blank' },
      },
      {
        label: 'GitHub Action',
        link: 'https://github.com/marketplace/actions/crowdin-action',
        attrs: { target: '_blank' },
      },
      {
        label: 'Visual Studio Code Plugin',
        link: 'https://marketplace.visualstudio.com/items?itemName=Crowdin.vscode-crowdin',
        attrs: { target: '_blank' },
      },
      {
        label: 'Android Studio Plugin',
        link: 'https://github.com/crowdin/android-studio-plugin#readme',
        attrs: { target: '_blank' },
      },
      {
        label: 'Android SDK',
        link: 'https://crowdin.github.io/mobile-sdk-android/',
        attrs: { target: '_blank' },
      },
      {
        label: 'iOS SDK',
        link: 'https://crowdin.github.io/mobile-sdk-ios/',
        attrs: { target: '_blank' },
      },
      {
        label: 'Website JS SDK',
        link: 'https://crowdin.github.io/ota-client-js/',
        attrs: { target: '_blank' },
      },
        {
            label: 'Flutter SDK',
            link: 'https://github.com/crowdin/flutter-sdk#readme',
            attrs: { target: '_blank' },
        },
    ],
    collapsed: true,
  },
  {
    label: 'Security',
    autogenerate: { directory: path('security') },
    collapsed: true,
  }
]

function path(...args: string[]) {
  return 'developer/' + args.join('/');
}
