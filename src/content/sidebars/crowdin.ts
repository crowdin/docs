import { sidebarLabel } from '../../utils/i18n';

/**
 * https://starlight.astro.build/reference/configuration/#sidebaritem
 */
export default [
  {
    ...sidebarLabel('gettingStarted'),
    items: [
      { slug: 'introduction' },
      { slug: 'for-managers' },
      { slug: 'for-translators' },
      { slug: 'supported-formats' },
      { slug: 'migrating-to-crowdin' },
      { slug: 'additional-support-services' },
      {
        ...sidebarLabel('account'),
        autogenerate: { directory: path('getting-started', 'account') },
        collapsed: true,
      },
    ],
    collapsed: true,
  },
  {
    ...sidebarLabel('translationProcess'),
    autogenerate: { directory: path('translation-process') },
    collapsed: true,
  },
  {
    ...sidebarLabel('projectManagement'),
    items: [
      { slug: 'creating-project' },
      { slug: 'screenshots' },
      { slug: 'project-activity' },
      { slug: 'discussions' },
      { slug: 'webhooks' },
      {
        ...sidebarLabel('sources'),
        autogenerate: { directory: path('project-management', 'sources') },
        collapsed: true,
      },
      {
        ...sidebarLabel('translations'),
        autogenerate: { directory: path('project-management', 'translations') },
        collapsed: true,
      },
      {
        ...sidebarLabel('projectSettings'),
        autogenerate: { directory: path('project-management', 'project-settings') },
        collapsed: true,
      }
    ],
    collapsed: true,
  },
  {
    ...sidebarLabel('teamManagement'),
    autogenerate: { directory: path('team-management') },
    collapsed: true,
  },
  {
    ...sidebarLabel('integrations'),
    autogenerate: { directory: path('integrations') },
    collapsed: true,
  },
  {
    ...sidebarLabel('localizationResources'),
    autogenerate: { directory: path('localization-resources') },
    collapsed: true,
  },
  {
    ...sidebarLabel('onlineEditor'),
    autogenerate: { directory: path('online-editor') },
    collapsed: true,
  },
  {
    ...sidebarLabel('tasks'),
    autogenerate: { directory: path('tasks') },
    collapsed: true,
  },
  {
    ...sidebarLabel('reports'),
    autogenerate: { directory: path('reports') },
    collapsed: true,
  },
  {
    ...sidebarLabel('billingAndPayments'),
    autogenerate: { directory: path('billing') },
    collapsed: true,
  }
]

function path(...args: string[]) {
  return 'crowdin/' + args.join('/');
}
