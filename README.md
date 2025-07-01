# Crowdin Docs

This repository contains the website code and Markdown articles for [Crowdin Docs](https://support.crowdin.com).

If you would like to contribute to the documentation, please read the [Contribution Guidelines](CONTRIBUTING.md).

## Getting Started

Clone the repository and install the dependencies:

```console
git clone git@github.com:crowdin/docs.git

cd docs

npm install
```

Run the development server:

```console
npm run dev
```

Open your browser and navigate to http://localhost:4321.

> **Note!**
> - Make sure you have Node.js v22 or higher installed on your machine.
> - This project uses the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification for commit messages and PR titles.

### Project Structure

Some important files and directories:

- `astro.config.mjs` - Astro configuration file.
- `src/content/docs` - contains groups describing the documentation for each product.
- `src/assets/screenshots` - contains screenshots for the documentation.
- `src/content/sidebrs` - sidebar configuration for Crowdin KB, Crowdin Enterprise KB, Developer Portal.
- `src/content/includes` - reusable content blocks that can be included in the documentation.
- `src/components` - contains reusable Astro components for the documentation.
- `src/pages` - custom pages.
- `public` - static assets like favicons, images that do not need optimization, etc.

### Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
|:--------------------------|:-------------------------------------------------|
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## Learn More

This project is built with Astro and Starlight. Here are some resources to get you started:

- [Starlight’s docs](https://starlight.astro.build/)
- [Astro docs](https://docs.astro.build)
- [Tailwind CSS docs](https://tailwindcss.com/)
- [Astro Discord server](https://astro.build/chat)

[![Built with Starlight](https://astro.badg.es/v2/built-with-starlight/tiny.svg)](https://starlight.astro.build)
