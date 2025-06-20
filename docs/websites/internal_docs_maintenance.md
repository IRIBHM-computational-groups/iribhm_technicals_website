# How to maintain this documentation

## Development

This page use [Docsify](https://docsify.js.org/#/?id=docsify) which is a framework use to build documentation using Markdown synthax.

1. Install Docsify `npm i docsify-cli -g` (Maybe sudo)
2. clone this repo `git clone git@github.com:Benoitdw/iribhm_website.git`
3. `docsify serve iribhm_website/docs` 
4. You can now live preview all your change in `http://localhost:3000`


## Deployment

Any commit on the master branch will automatically call a github action that will build the new version of the website that you can find [here](https://benoitdw.github.io/iribhm_website/#/). This is meant to be a living document, feel free to update this and add useful information.