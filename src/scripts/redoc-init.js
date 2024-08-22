function initRedoc(apiSpecUrl) {
  Redoc.init(apiSpecUrl, {
    menuToggle: true,
    theme: {
      logo: {
        gutter: '4px',
        maxHeight: '40px',
        maxWidth: '200px',
        width: '180px',
      },
      showWebhookVerb: false,
      sidebar: {
        width: '280px',
        textColor: 'rgba(38, 50, 56, 0.87)',
        backgroundColor: '#f5f7f8',
        fontFamily: 'Noto Sans, sans-serif',
        fontSize: '14px',
        activeTextColor: '#263238',
        groupItems:  {
          activeBackgroundColor: '#ffffff',
          activeTextColor: '#263238',
        },
        level1Items: {
          activeBackgroundColor: '#ffffff',
          activeTextColor: '#263238',
        },
        arrow: {
          size: '1rem',
          color: 'rgba(38, 50, 56, .54)'
        }
      },
      rightPanel: {
        backgroundColor: '#263238',
        width: '40%',
        textColor: '#ffffff',
        servers: {
          overlay: {
            backgroundColor: '#263238',
            textColor: '#ffffff'
          }
        }
      },
      colors: {
        tonalOffset: 0.3,
        primary: {
          main: '#43a047'
        },
        http: {
          get: '#6bbd5b',
          post: '#248fb2',
          put: '#9b708b',
          options: '#d3ca12',
          patch: '#e09d43',
          delete: '#e27a7a',
          basic: '#999',
          link: '#31bbb6',
          head: '#c167e4',
        }
      },
      components: {
        buttons: {
          borderRadius: '4px',
        }
      },
      typography: {
        fontSize: '1rem',
        lineHeight: '1.4em',
        fontWeightRegular: '400',
        fontWeightBold: '600',
        fontWeightLight: '300',
        fontFamily: 'Noto Sans, sans-serif',
        smoothing: 'antialiased',
        optimizeSpeed: true,
        links: {
          color: '#43a047',
          visited: '#43a047',
          hover: '#66bb6a',
          textDecoration: 'none',
          hoverTextDecoration: 'underline',
        },
        headings : {
          fontFamily: 'Plus Jakarta Sans, sans-serif',
          fontWeight: '500',
          lineHeight: '1.2em'
        },
        code: {
          color: '#e83e8c',
          backgroundColor: 'rgba(38, 50, 56, 0.05)',
          fontSize: '14px',
          fontFamily: 'Courier, monospace',
          wrap: false,
        },
      },
      codeBlock: {
        backgroundColor: '#212b31',
      },
    }
  }, document.getElementById('redoc-container'));
}
