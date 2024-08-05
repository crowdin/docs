/**
 * https://starlight.astro.build/reference/configuration/#sidebaritem
 */
export default  [
  {
    label: 'Getting Started',
    items: [
      { slug: path('introduction') },
      { slug: path('for-managers') },
      { slug: path('for-translators') },
      { slug: path('for-vendors')},
      { slug: path('supported-formats') },
      { slug: path('migrating-to-crowdin-enterprise') },
      { slug: path('additional-support-services') },
      {
        label: 'Account',
        autogenerate: { directory: path('getting-started', 'account') },
        collapsed: true,
      },
    ],
    collapsed: true,
  },
  {
    label: 'Translation Process',
    autogenerate: { directory: path('translation-process') },
    collapsed: true,
  },
  {
    label: 'Organization Management',
    items: [
      { slug: path('organization') },
      { slug: path('groups') },
      { slug: path('vendors') },
      { slug: path('clients') },
      { slug: path('crowdsourcing') },
      {
        label: 'Workflows',
        autogenerate: { directory: path('organization-management', 'workflows') },
        collapsed: true,
      },
      {
        label: 'Organization Settings',
        autogenerate: { directory: path('organization-management', 'settings') },
        collapsed: true,
      }
    ],
    collapsed: true,
  },
  {
    label: 'Project Management',
    items: [
      { slug: path('creating-project') },
      { slug: path('screenshots') },
      { slug: path('project-activity') },
      {
        label: 'Sources',
        autogenerate: { directory: path('project-management', 'sources') },
        collapsed: true,
      },
      {
        label: 'Translations',
        autogenerate: { directory: path('project-management', 'translations') },
        collapsed: true,
      },
      {
        label: 'Project Settings',
        autogenerate: { directory: path('project-management', 'project-settings') },
        collapsed: true,
      }
    ],
    collapsed: true,
  },
  {
    label: 'Team Management',
    autogenerate: { directory: path('team-management') },
    collapsed: true,
  },
  {
    label: 'Integrations',
    autogenerate: { directory: path('integrations') },
    collapsed: true,
  },
  {
    label: 'Localization Resources',
    autogenerate: { directory: path('localization-resources') },
    collapsed: true,
  },
  {
    label: 'Online Editor',
    autogenerate: { directory: path('online-editor') },
    collapsed: true,
  },
  {
    label: 'Tasks',
    autogenerate: { directory: path('tasks') },
    collapsed: true,
  },
  {
    label: 'Reports',
    autogenerate: { directory: path('reports') },
    collapsed: true,
  },
  {
    label: 'Billing and Payments',
    autogenerate: { directory: path('billing') },
    collapsed: true,
  }
]

function path(...args: string[]) {
  return 'enterprise/' + args.join('/');
}
