/**
 * https://starlight.astro.build/reference/configuration/#sidebaritem
 */
import { sidebarLabel } from '../../utils/i18n';

export default  [
  {
    ...sidebarLabel('gettingStarted'),
    items: [
      { slug: path('introduction') },
      { slug: path('for-managers') },
      { slug: path('for-translators') },
      { slug: path('for-vendors')},
      { slug: path('keyboard-shortcuts') },
      { slug: path('supported-formats') },
      { slug: path('migrating-to-crowdin-enterprise') },
      { slug: path('additional-support-services') },
      { slug: path('comparing-crowdin-and-crowdin-enterprise') },
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
    ...sidebarLabel('organizationManagement'),
    items: [
      { slug: path('organization') },
      { slug: path('groups') },
      { slug: path('vendors') },
      { slug: path('clients') },
      { slug: path('crowdsourcing') },
      {
        ...sidebarLabel('workflows'),
        collapsed: true,
        items: [{ autogenerate: { directory: path('organization-management', 'workflows'), collapsed: true } }],
      },
      {
        ...sidebarLabel('organizationSettings'),
        collapsed: true,
        items: [{ autogenerate: { directory: path('organization-management', 'settings'), collapsed: true } }],
      }
    ],
    collapsed: true,
  },
  {
    ...sidebarLabel('projectManagement'),
    items: [
      { slug: path('creating-project') },
      { slug: path('screenshots') },
      { slug: path('advisors') },
      { slug: path('project-activity') },
      { slug: path('webhooks') },
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
  return 'enterprise/' + args.join('/');
}
