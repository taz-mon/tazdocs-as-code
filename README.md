[![Live Site](https://img.shields.io/website?up_message=LIVE&down_message=DOWN&url=https%3A%2F%2Ftaz-mon.github.io%2Ftazdocs-as-code%2F&style=for-the-badge)](https://taz-mon.github.io/tazdocs-as-code/)
[![Deploy](https://img.shields.io/github/actions/workflow/status/taz-mon/tazdocs-as-code/static.yml?style=for-the-badge&label=Deploy)](https://github.com/taz-mon/tazdocs-as-code/actions)
[![Built with Docusaurus](https://img.shields.io/badge/Built%20with-Docusaurus%203.x-teal?style=for-the-badge)](https://docusaurus.io/)

# The Taz docs-as-code laboratory

#### A technical writing portfolio built as a working docs-as-code site: resume, writing samples, and an OpenAPI reference, all authored in Markdown and deployed automatically through GitHub Actions.

---

This repository is my portfolio: my resume, the writing samples I've built over the past year, and a full API documentation example, all living here as a real, running Docusaurus site rather than scattered across separate files. When I want to update it, I push to `main` and GitHub Actions rebuilds and redeploys it automatically.

**[View the live site →](https://taz-mon.github.io/tazdocs-as-code/)**

Read on for how it's built and how I keep adding to it.

---

## Contents

- [About this repo](#about-this-repo)
- [What's in this site](#whats-in-this-site)
- [Run locally](#run-locally)
- [Project structure](#project-structure)
- [Why Docusaurus](#why-docusaurus)
- [Deployment](#deployment)
- [Author](#author)

---

## About this repo

I built this site using Docusaurus 3.x, which demonstrates a docs-as-code workflow end to end: Markdown authoring, a structured sidebar taxonomy, custom CSS theming, an integrated OpenAPI reference via Redocusaurus, and automated GitHub Pages deployment through GitHub Actions.

I created this site by following [How to Set Up Documentation as Code with Docusaurus and GitHub Actions](https://www.freecodecamp.org/news/set-up-docs-as-code-with-docusaurus-and-github-actions/) on freeCodeCamp. If you're a technical writer who hasn't worked with a static site generator yet, it's a solid starting point, and a useful one to know: the field is shifting toward docs-as-code, and being comfortable with these tools is increasingly part of the job, not an optional extra.

## What's in this site

| Section | What it covers |
| --- | --- |
| [Resume](https://taz-mon.github.io/tazdocs-as-code/docs/my-docs/resume) | Background, experience, and core skills |
| [Writing samples](https://taz-mon.github.io/tazdocs-as-code/docs/my-docs/writing-samples) | Eight writing samples spanning docs-as-code projects, DITA/Oxygen publishing, Kubernetes troubleshooting, open-source contribution, and enterprise infrastructure docs |
| [API Experiment](https://taz-mon.github.io/tazdocs-as-code/api/jvn-chatbot) | A full OpenAPI 3.0 specification for a Node.js/Express chatbot API, rendered through Redocusaurus |
| Blog | Longer-form articles on documentation practice |

## Run locally

**Prerequisites:** Node.js 18 or later, npm.

```
git clone https://github.com/taz-mon/tazdocs-as-code.git
cd tazdocs-as-code
npm install
npm start
```

Browse the site at [localhost:3000/tazdocs-as-code/](http://localhost:3000/tazdocs-as-code/).

To build a production copy:

```
npm run build
```

Static output is written to the `/build` directory.

## Project structure

```
tazdocs-as-code/
├── docs/
│   ├── intro.md
│   └── my-docs/
│       ├── resume.md
│       ├── how-i-work.md
│       ├── writing-samples.md         # Parent page; 8 child pages below
│       ├── site-reorg-docusaurus.md
│       ├── dita-poc.md
│       ├── kubctl-reference.md
│       ├── jvn-intro.md
│       ├── jvn-personality-guide.md
│       ├── readme-content-example.md
│       ├── vectorlint-work.md
│       └── saas-infra-examples.md
├── openapi/
│   └── jvn-chatbot/
│       └── index_openapi.yaml         # Copied from the jvn-chatbot-api repo
├── blog/
│   └── writing-for-agents/
├── src/
│   ├── css/
│   │   └── custom.css                 # Custom theme, navy/orange/teal palette
│   └── pages/
│       └── index.js                   # Homepage hero
├── docusaurus.config.js               # Site config, navbar, Redocusaurus setup
└── sidebars.js                        # Sidebar structure
```

## Why Docusaurus

Docusaurus gave me three things I wanted in a portfolio: Markdown-first authoring so content stays plain and versionable, a built-in sidebar/category system so the writing samples could grow without manual navigation upkeep, and first-class support for an OpenAPI reference through the Redocusaurus plugin, so the JVN Chatbot API documentation lives in the same site rather than a separate tool.

## Deployment

This site deploys automatically to GitHub Pages using a GitHub Actions workflow I defined in [`.github/workflows/static.yml`](https://github.com/taz-mon/tazdocs-as-code/blob/main/.github/workflows/static.yml). The workflow runs on every push to `main`; I can also trigger it manually the repo's Actions tab.

### How the workflow is structured

I set up the workflow to use a single `deploy` job that runs all steps in sequence on `ubuntu-latest`:

```yaml
jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with:
          path: './build'
      - uses: actions/deploy-pages@v4
        id: deployment
```

Like the deploy workflows on my other portfolio repos, this keeps build and deploy in one job rather than splitting them across runners, since a single-site deployment doesn't need the added complexity of passing the build artifact between separate jobs.

The workflow also sets `concurrency` with `cancel-in-progress: false`, so if a push happens while a deployment is already running, the new run queues instead of racing the in-progress one, and any in-flight production deployment is always allowed to finish.

### Adding validations to the workflow

The workflow is intentionally minimal. As the site grows, additional validation steps can be inserted between the build step and the Pages upload. Candidates include:

| Validation | Tool | Insert after |
| --- | --- | --- |
| Broken link checking | `docusaurus-plugin-check-links` | `npm run build` |
| Markdown lint | `markdownlint-cli` | `npm ci` |
| Spelling check | `cspell` | `npm ci` |

One validation is already built in without any extra tooling: `docusaurus.config.js` sets `onBrokenLinks: 'throw'`, so a broken doc reference anywhere in the sidebar fails the `npm run build` step outright rather than shipping a dead link.

### Permissions

The workflow requires these GitHub token permissions to deploy to Pages:

```yaml
permissions:
  contents: read
  pages: write
  id-token: write
```

Live URL: `https://taz-mon.github.io/tazdocs-as-code/`

## Author

**Tom "Taz" Aciukewicz** — Principal Technical Writer with experience documenting complex enterprise software, cloud infrastructure, and developer platforms.

- GitHub: [@taz-mon](https://github.com/taz-mon)
- LinkedIn: [linkedin.com/in/toma2z](https://linkedin.com/in/toma2z/)

---

*This site is an active work in progress. Content, structure, and styling continue to evolve as I add new writing samples.*
