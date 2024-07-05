/**
 * https://starlight.astro.build/reference/configuration/#sidebaritem
 */
export default [
  {
    label: 'Crowdin Apps',
    items: [
      { slug: path('introduction') },
      { slug: path('crowdin-apps', 'quick-start') },
    ],
  }
]

function path(...args: string[]) {
  return 'developer/' + args.join('/');
}
