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
    ...sidebarLabel('organizationManagement'),
    items: [
      { slug: path('organization') },
      { slug: path('groups') },
      { slug: path('vendors') },
      { slug: path('clients') },
      { slug: path('crowdsourcing') },
      {
        ...sidebarLabel('workflows'),
        autogenerate: { directory: path('organization-management', 'workflows') },
        collapsed: true,
      },
      {
        ...sidebarLabel('organizationSettings'),
        autogenerate: { directory: path('organization-management', 'settings') },
        collapsed: true,
      }
    ],
    collapsed: true,
  },
  {
    ...sidebarLabel('projectManagement'),
    items: [
      { slug: path('creating-project') },
      { slug: path('screenshots') },
      { slug: path('project-activity') },
      { slug: path('webhooks') },
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
  return 'enterprise/' + args.join('/');
}
