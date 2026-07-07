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
        collapsed: true,
        items: [{ autogenerate: { directory: path('getting-started', 'account'), collapsed: true } }],
      },
    ],
    collapsed: true,
  },
  {
    ...sidebarLabel('translationProcess'),
    collapsed: true,
    items: [{ autogenerate: { directory: path('translation-process'), collapsed: true } }],
  },
  {
    ...sidebarLabel('projectManagement'),
    items: [
      { slug: 'creating-project' },
      { slug: 'screenshots' },
      { slug: 'advisors' },
      { slug: 'project-activity' },
      { slug: 'discussions' },
      { slug: 'webhooks' },
      {
        ...sidebarLabel('sources'),
        collapsed: true,
        items: [{ autogenerate: { directory: path('project-management', 'sources'), collapsed: true } }],
      },
      {
        ...sidebarLabel('translations'),
        collapsed: true,
        items: [{ autogenerate: { directory: path('project-management', 'translations'), collapsed: true } }],
      },
      {
        ...sidebarLabel('projectSettings'),
        collapsed: true,
        items: [{ autogenerate: { directory: path('project-management', 'project-settings'), collapsed: true } }],
      }
    ],
    collapsed: true,
  },
  {
    ...sidebarLabel('teamManagement'),
    collapsed: true,
    items: [{ autogenerate: { directory: path('team-management'), collapsed: true } }],
  },
  {
    ...sidebarLabel('integrations'),
    collapsed: true,
    items: [{ autogenerate: { directory: path('integrations'), collapsed: true } }],
  },
  {
    ...sidebarLabel('localizationResources'),
    collapsed: true,
    items: [{ autogenerate: { directory: path('localization-resources'), collapsed: true } }],
  },
  {
    ...sidebarLabel('onlineEditor'),
    collapsed: true,
    items: [{ autogenerate: { directory: path('online-editor'), collapsed: true } }],
  },
  {
    ...sidebarLabel('tasks'),
    collapsed: true,
    items: [{ autogenerate: { directory: path('tasks'), collapsed: true } }],
  },
  {
    ...sidebarLabel('reports'),
    collapsed: true,
    items: [{ autogenerate: { directory: path('reports'), collapsed: true } }],
  },
  {
    ...sidebarLabel('billingAndPayments'),
    collapsed: true,
    items: [{ autogenerate: { directory: path('billing'), collapsed: true } }],
  }
]

function path(...args: string[]) {
  return 'crowdin/' + args.join('/');
}
