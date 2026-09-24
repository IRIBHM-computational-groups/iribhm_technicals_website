# iribhm_technicals_website

Internal technical documentation of the IRIBHM computational groups, built with [Astro](https://astro.build) + [Starlight](https://starlight.astro.build).

## Development

1. Install [Node.js](https://nodejs.org) 22+
2. `git clone git@github.com:IRIBHM-computational-groups/iribhm_technicals_website.git`
3. `npm install`
4. `npm run dev` and open `http://localhost:4321/iribhm_technicals_website/`

Pages are Markdown files in `src/content/docs/`; the sidebar is defined in `astro.config.mjs`. See the "Internal docs maintenance" page for details.

`npm run build` produces the static site in `dist/`.

## Deployment

Pushing to `master` builds and publishes the site to <https://iribhm-computational-groups.github.io/iribhm_technicals_website/> via `.github/workflows/deploy.yml`.

This requires the repository setting **Settings → Pages → Build and deployment → Source** to be set to **GitHub Actions** (it used to be "Deploy from a branch", `master` / `docs`).
