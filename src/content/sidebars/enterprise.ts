const linkPrefix = '/enterprise';

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
        ],
    }
]

function path(...args: string[]) {
    return '/enterprise/' + args.join('/');
}
