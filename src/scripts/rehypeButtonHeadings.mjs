/**
 * Custom rehype plugin to add button elements with heading icons to headings
 * The button is used onClick handlers for copy-link functionality
 */
export function rehypeButtonHeadings() {
  return (tree) => {
    function traverse(node) {
      // Check if it's a heading element (h1-h6) with an id
      if (
        node.type === 'element' &&
        /^h[1-6]$/.test(node.tagName) &&
        node.properties &&
        node.properties.id
      ) {
        const headingId = node.properties.id;

          const onClickHandler = `(function(btn) {
          const url = window.location.origin + window.location.pathname + '#${headingId}';
          if (navigator.clipboard) {
            navigator.clipboard.writeText(url)
              .then(() => {
                const originalTitle = btn.title;
                btn.setAttribute('data-copied', 'true');

                // Reset after 2 seconds
                setTimeout(() => {
                  btn.removeAttribute('data-copied');
                }, 2000);
              })
              .catch(err => console.error('Failed to copy:', err));
          } else {
            console.error('Clipboard API not available. Requires HTTPS or localhost.');
          }
        })(this)`;

        const button = {
          type: 'element',
          tagName: 'button',
          properties: {
            type: 'button',
            title: 'Click to copy link',
            onClick: onClickHandler,
            'data-tooltip': 'Copy link',
            class: 'tooltip-container'
          },
          children: [
            {
              type: 'element',
              tagName: 'span',
              properties: {
                className: ['heading-icon']
              },
              children: []
            }
          ]
        };

        node.children.push(button);
      }

      if (node.children && Array.isArray(node.children)) {
        node.children.forEach(child => traverse(child));
      }
    }

    traverse(tree);
  };
}

