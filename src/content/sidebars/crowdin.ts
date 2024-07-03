/**
 * https://starlight.astro.build/reference/configuration/#sidebaritem
 */
export default [
  {
    label: 'Getting Started',
    items: [
      { label: 'Introduction', link: path('introduction') },
      { label: 'For Managers', link: path('getting-started', 'for-managers') },
      { label: 'For Translators', link: path('getting-started', 'for-translators') },
      { label: 'For Developers', link: path('getting-started', 'for-developers') },
      { label: 'Supported Formats', link: path('getting-started', 'supported-formats') },
      { label: 'Migrating to Crowdin', link: path('getting-started', 'migrating-to-crowdin') },
      { label: 'Additional Support Services', link: path('getting-started', 'additional-support-services') },
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
      { label: 'Creating a Project', link: path('project-management', 'creating-project') },
      { label: 'Screenshots', link: path('project-management', 'screenshots') },
      { label: 'Tasks', link: path('project-management', 'tasks') },
      { label: 'Project Activity', link: path('project-management', 'project-activity') },
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
  return '/crowdin/' + args.join('/');
}
