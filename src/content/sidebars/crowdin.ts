/**
 * https://starlight.astro.build/reference/configuration/#sidebaritem
 */
export default [
  {
    label: 'Getting Started',
    items: [
      { slug: path('introduction') },
      { slug: path('getting-started', 'for-managers') },
      { slug: path('getting-started', 'for-translators') },
      { slug: path('getting-started', 'for-developers') },
      { slug: path('getting-started', 'supported-formats') },
      { slug: path('getting-started', 'migrating-to-crowdin') },
      { slug: path('getting-started', 'additional-support-services') },
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
      { slug: path('project-management', 'creating-project') },
      { slug: path('project-management', 'screenshots') },
      { slug: path('project-management', 'tasks') },
      { slug: path('project-management', 'project-activity') },
      {
        label: 'Content',
        autogenerate: { directory: path('project-management', 'content') },
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
