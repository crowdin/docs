/**
 * https://starlight.astro.build/reference/configuration/#sidebaritem
 */
export default [
  {
    label: 'Getting Started',
    items: [
      { label: 'Introduction', link: path('introduction') },
      { label: 'Features', link: path('getting-started', 'features') },
      { label: 'For Managers', link: path('getting-started', 'for-managers') },
      { label: 'For Translators', link: path('getting-started', 'for-translators') },
      { label: 'For Developers', link: path('getting-started', 'for-developers') },
      { label: 'Supported Formats', link: path('getting-started', 'supported-formats') },
      { label: 'Migrating to Crowdin', link: path('getting-started', 'migrating-to-crowdin') },
      { label: 'Additional Support Services', link: path('getting-started', 'additional-support-services') },
      {
        label: 'Account',
        items: [
          { label: 'Notifications', link: path('getting-started', 'account', 'notifications') },
          { label: 'Messages', link: path('getting-started', 'account', 'messages') },
          { label: 'Settings', link: path('getting-started', 'account', 'settings') },
        ],
        collapsed: true,
      },
    ],
  },
  {
    label: 'Translation Process',
    items: [
      { label: 'Translation Strategies', link: path('translation-process', 'translation-strategies') },
      { label: 'Crowdin AI', link: path('translation-process', 'crowdin-ai') },
      { label: 'Pre-Translation via Machine', link: path('translation-process', 'pre-translation-via-machine') },
      { label: 'Ordering Professional Translations', link: path('translation-process', 'ordering-professional-translations') },
      { label: 'Offline Translation', link: path('translation-process', 'offline-translation') },
    ]
  },
  {
    label: 'Project Management',
    items: [
      { label: 'Creating a Project', link: path('project-management', 'creating-project') },
      {
        label: 'Content',
        items: [
          { label: 'Uploading Source Files', link: path('project-management', 'content', 'uploading-files') },
          { label: 'Uploading Existing Translations', link: path('project-management', 'content', 'uploading-translations') },
          { label: 'Version Management', link: path('project-management', 'content', 'version-management') },
          { label: 'Custom Segmentation', link: path('project-management', 'content', 'custom-segmentation') },
          { label: 'Asset Localization', link: path('project-management', 'content', 'asset-localization') },
          { label: 'CSV / XLSX File Configuration', link: path('project-management', 'content', 'csv-xlsx-configuration') },
          { label: 'XML File Configuration', link: path('project-management', 'content', 'xml-configuration') },
        ],
        collapsed: true,
      },
      {
        label: 'Translations',
        items: [
          { label: 'Downloading Translations', link: path('project-management', 'translations', 'downloading-translations') },
          { label: 'Target Files Bundles', link: path('project-management', 'translations', 'bundles') },
        ],
        collapsed: true,
      },
      { label: 'Screenshots', link: path('project-management', 'screenshots') },
      { label: 'Tasks', link: path('project-management', 'tasks') },
      { label: 'Project Activity', link: path('project-management', 'project-activity') },
      {
        label: 'Project Settings',
        items: [
          { label: 'General', link: path('project-management', 'project-settings', 'general') },
          { label: 'Languages', link: path('project-management', 'project-settings', 'languages') },
          { label: 'Import', link: path('project-management', 'project-settings', 'import') },
          { label: 'Quality Assurance Checks', link: path('project-management', 'project-settings', 'qa-checks') },
          { label: 'Parser Configuration', link: path('project-management', 'project-settings', 'parser-configuration') },
        ],
        collapsed: true,
      }
    ]
  },
  {
    label: 'Team Management',
    items: [
      { label: 'Overview', link: path('team-management', 'overview') },
      // TODO: Add team management items
    ]
  },
  {
    label: 'Integrations',
    items: [
        // TODO: Add integrations
    ],
  },
  {
    label: 'Localization Resources',
    items: [
      { label: 'Translation Memory', link: path('localization-resources', 'translation-memory') },
      { label: 'Glossary', link: path('localization-resources', 'glossary') },
      { label: 'Machine Translation (MT)', link: path('localization-resources', 'machine-translation') },
    ]
  },
  {
    label: 'Online Editor',
    items: [
      { label: 'Overview', link: path('online-editor', 'overview') },
      { label: 'Translation Consistency', link: path('online-editor', 'translation-consistency') },
      { label: 'Word Counter', link: path('online-editor', 'word-counter') },
      { label: 'ICU Message Syntax', link: path('online-editor', 'icu-message-syntax') },
      { label: 'Expression Syntax Elements', link: path('online-editor', 'expression-syntax-elements') },
    ]
  },
  {
    label: 'Reports',
    items: [
      { label: 'Project Reports', link: path('reports', 'project-reports') },
      { label: 'Contributor Reports', link: path('reports', 'contributor-reports') },
    ]
  },
  {
    label: 'Billing and Payments',
    items: [
      { label: 'Payments and Invoices', link: path('billing-and-payments', 'payments-invoices') },
      { label: 'Changing Subscription Plan', link: path('billing-and-payments', 'changing-subscription-plan') },
      { label: 'App Subscriptions', link: path('billing-and-payments', 'app-subscriptions') },
      { label: 'Billing Settings', link: path('billing-and-payments', 'billing-settings') },
    ]
  }
]

function path(...args: string[]) {
  return '/crowdin/' + args.join('/');
}
