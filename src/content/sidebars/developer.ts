/**
 * https://starlight.astro.build/reference/configuration/#sidebaritem
 */
export default [
  {
    label: 'Crowdin Apps',
    items: [
      { label: 'Introduction', link: path('introduction') },
      { label: 'Quick Start', link: path('crowdin-apps', 'quick-start') },
    ],
  }
]

function path(...args: string[]) {
  return '/developer/' + args.join('/');
}
