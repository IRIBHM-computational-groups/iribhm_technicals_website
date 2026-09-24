---
title: "How to maintain this documentation"
---

## Development

This site is built with [Astro](https://astro.build) and its documentation theme [Starlight](https://starlight.astro.build). Pages are written in [Markdown](https://www.markdownguide.org/cheat-sheet/) format, a simple syntax typically also used for README files.

1. Install [Node.js](https://nodejs.org) (version 22 or newer).
2. Clone this repo: `git clone git@github.com:IRIBHM-computational-groups/iribhm_technicals_website.git`
3. Install the dependencies: `npm install`
4. Start the dev server: `npm run dev`
5. You can now live preview all your changes at `http://localhost:4321/iribhm_technicals_website/`

## Adding or editing a page

- Pages live in `src/content/docs/`. The file path is the URL: `src/content/docs/start/singularity.md` is served at `/start/singularity/`.
- Every page starts with a frontmatter block giving its title (do not repeat it as a `#` heading):

  ```md
  ---
  title: My new page
  ---
  ```

- Add new pages to the sidebar in `astro.config.mjs`.
- Callouts use `:::note`, `:::tip`, `:::caution` or `:::danger`, closed by `:::`.
- For components such as tabs, name the file `.mdx` (see `start/working_with_hyperion.mdx`).
- Shared files (logos, …) go in `public/`.

## Deployment

Any commit on the `master` branch triggers the GitHub Action in `.github/workflows/deploy.yml`, which builds the site and publishes it to [GitHub Pages](https://iribhm-computational-groups.github.io/iribhm_technicals_website/). The run takes about a minute; you can follow it in the "Actions" tab of the repository.

Run `npm run build` before pushing to check that the site still builds, since a build error means the published site keeps its previous version.

This is meant to be a living document, feel free to update this and add useful information.
