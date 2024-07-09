/**
 * https://starlight.astro.build/reference/configuration/#sidebaritem
 */
export default [
  {
    label: 'Getting Started',
    items: [
      { slug: 'introduction' },
      { slug: 'for-managers' },
      { slug: 'for-translators' },
      { slug: 'for-developers' },
      { slug: 'supported-formats' },
      { slug: 'migrating-to-crowdin' },
      { slug: 'additional-support-services' },
      {
        label: 'Account',
        autogenerate: { directory: path('getting-started', 'account') },
        collapsed: true,
      },
    ],
  },
  {
    label: 'Translation Process',
    autogenerate: { directory: path('translation-process') },
    collapsed: true,
  },
  {
    label: 'Project Management',
    items: [
      { slug: 'creating-project' },
      { slug: 'screenshots' },
      { slug: 'project-activity' },
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
  return 'crowdin/' + args.join('/');
}
