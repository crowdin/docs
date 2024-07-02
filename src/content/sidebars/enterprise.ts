/**
 * https://starlight.astro.build/reference/configuration/#sidebaritem
 */
export default  [
  {
    label: 'Getting Started',
    items: [
      { label: 'Introduction', link: path('introduction') },
      { label: 'Features', link: path('getting-started', 'features') },
      { label: 'For Managers', link: path('getting-started', 'for-managers') },
      { label: 'For Translators', link: path('getting-started', 'for-translators') },
      { label: 'For Vendors', link: path('getting-started', 'for-vendors')},
      { label: 'For Developers', link: path('getting-started', 'for-developers') },
      { label: 'Supported Formats', link: path('getting-started', 'supported-formats') },
      { label: 'Migrating to Crowdin Enterprise', link: path('getting-started', 'migrating-to-crowdin-enterprise') },
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
  },

  /**
   *
   * - **Organization Management**
   *     - [Overview](https://support.crowdin.com/enterprise/organization/)
   *     - [Groups](https://support.crowdin.com/enterprise/groups/)
   *     - [Teams](https://support.crowdin.com/enterprise/teams/)
   *     - [Vendors](https://support.crowdin.com/enterprise/vendors/)
   *     - [Clients](https://support.crowdin.com/enterprise/clients/)
   *     - [Crowdsourcing](https://support.crowdin.com/enterprise/crowdsourcing/)
   *     - **Workflows**
   *         - [Workflow Overview](https://support.crowdin.com/enterprise/workflows/)
   *         - [Source Text Review](https://support.crowdin.com/enterprise/source-text-review/)
   *         - [Translation and Proofreading by Vendor](https://support.crowdin.com/enterprise/translation-proofreading-by-vendor/)
   *         - [Translation by API Vendor](https://support.crowdin.com/enterprise/translation-by-api-vendor/)
   *         - [Custom Code](https://support.crowdin.com/enterprise/custom-code/)
   *     - **Organization Settings**
   *         - [General](https://support.crowdin.com/enterprise/organization-settings/)
   *         - [Authentication Settings](https://support.crowdin.com/enterprise/authentication-settings/) + [IP Allowlist](https://support.crowdin.com/enterprise/ip-allowlist/)
   *         - [SAML](https://support.crowdin.com/enterprise/saml/) + [Configuring SAML SSO for Google Workspace](https://support.crowdin.com/enterprise/saml-google-workspace/) + (…)
   *         - [Fields](https://support.crowdin.com/enterprise/fields/)
   *         - [Custom Quality Assurance Checks +](https://support.crowdin.com/enterprise/custom-qa-checks/) [Code Snippet for Custom QA Checks](https://support.crowdin.com/enterprise/code-snippet-qa-checks/)
   *         - [Custom Placeholders](https://support.crowdin.com/enterprise/custom-placeholders/)
   *         - [Permission Granularity Mode](https://support.crowdin.com/enterprise/permissions-granularity-mode/)
   *
   */

  {
    label: 'Organization Management',
    items: [
      { label: 'Overview', link: path('organization-management', 'overview') },
      { label: 'Groups', link: path('organization-management', 'groups') },
      { label: 'Teams', link: path('organization-management', 'teams') },
      { label: 'Vendors', link: path('organization-management', 'vendors') },
      { label: 'Clients', link: path('organization-management', 'clients') },
      { label: 'Crowdsourcing', link: path('organization-management', 'crowdsourcing') },
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
    ]
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
    ]
  },
  {
    label: 'Team Management',
    autogenerate: { directory: path('team-management') },
  },
  {
    label: 'Integrations',
    autogenerate: { directory: path('integrations') },
  },
  {
    label: 'Localization Resources',
    autogenerate: { directory: path('localization-resources') },
  },
  {
    label: 'Online Editor',
    autogenerate: { directory: path('online-editor') },
  },
  {
    label: 'Reports',
    autogenerate: { directory: path('reports') },
  },
  {
    label: 'Billing and Payments',
    autogenerate: { directory: path('billing') },
  }
]

function path(...args: string[]) {
  return '/enterprise/' + args.join('/');
}
